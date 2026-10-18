// Deterministic simulation shared by the game client and the leaderboard worker.
//
// Everything here must be bit-reproducible across JS engines, so the physics path
// uses only IEEE-754 exact operations: + - * / , comparisons, and Math.sqrt /
// Math.round / Math.imul. Math.hypot is deliberately avoided (its result is
// implementation-approximated), and Math.sin / cos / exp are kept out of the
// physics path entirely by recording already-resolved world-space intent instead
// of raw key state.
//
// World generation must consume the RNG stream in exactly the same order as it
// always has, including the calls made purely for coin bob phases, because the
// stream position determines every subsequent platform.

export const CONST = {
  GRAVITY: -36,
  PH: 2.0,
  HW: 0.42,
  WALK: 9.5,
  SPRINT: 15.5,
  ACC_GROUND: 70,
  ACC_AIR: 26,
  JUMP_V: 13.6,
  DOUBLE_V: 11.8,
  COYOTE: 0.12,
  JUMP_BUFFER: 0.14,
  FIXED_DT: 1 / 120,
  SPAWN_Z: 14,
  X_LIMIT: 30,
  QUANT: 4096,
  MAX_TRACE_TICKS: 120 * 600,
  GRAB_BELOW: 2.15,
  GRAB_ABOVE: 0.95,
  GRAB_REACH: 0.9,
  HANG_DROP: 1.62,
  STAND_EPS: 0.06,
  MANTLE_TIME: 0.3
};

export const EV_JUMP = 1;
export const EV_DOUBLE = 2;
export const EV_LAND = 3;
export const EV_GRAB = 4;
export const EV_MANTLE = 5;
export const EV_DROP = 6;

export const MODE_NORMAL = 0;
export const MODE_HANG = 1;
export const MODE_MANTLE = 2;

const PAL = [0x6f7a80, 0x7d7469, 0x5f6b6e, 0x8a847b, 0x6b6f78, 0x7a6a63, 0x646e6a];
const DARK = 0x3c4448;
const HAZARD = 0xdd6524;
const SKIN = 0.02;

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;

export function hashSeed(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) >>> 0;
}

function mulberry32(a) {
  let s = a >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createGenerator(seedString) {
  const rnd = mulberry32(hashSeed(seedString));
  const rand = (a, b) => a + rnd() * (b - a);
  const irand = (a, b) => a + ((rnd() * (b - a + 1)) | 0);
  const chance = (p) => rnd() < p;
  const pick = (arr) => arr[(rnd() * arr.length) | 0];

  let worldZ = 0;
  let trackX = 0;
  let trackY = 0;
  let chunkIndex = 0;
  let currentIndex = 0;
  let solids = [];

  const coins = [];
  const chunks = [];

  function genDifficulty(i) {
    return clamp((i * 21) / 1400, 0, 1);
  }

  function addBox(c, x, y, z, w, h, d, color) {
    const lo = Math.max(z, c.z1);
    const hi = Math.min(z + d, c.z0);
    if (hi - lo < 0.02) return null;
    z = lo;
    d = hi - lo;
    const box = {
      x0: x, y0: y, z0: z,
      x1: x + w, y1: y + h, z1: z + d,
      color, chunk: c.index
    };
    c.boxes.push(box);
    solids.push(box);
    return box;
  }

  function addGlow(c, x, y, z, r, color) {
    c.glows.push({ x, y, z, r, color });
  }

  function slab(c, x0, x1, z0, z1, top, base, color) {
    return addBox(c, x0, base, z1, x1 - x0, top - base, z0 - z1, color);
  }

  function curb(c, x, w, h) {
    addBox(c, x, c.y - h - 0.3, c.z1, w, h + 0.25, c.z0 - c.z1, DARK);
  }

  function edgeStripe(c, x0, x1, z, y) {
    addBox(c, x0, y + 0.05, z, x1 - x0, 0.18, 0.42, HAZARD);
  }

  function coinRow(x, y, z, n, span) {
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0.5 : i / (n - 1);
      coins.push({ x: x + (t - 0.5) * span, y: y + 1.3, z, ph: rnd() * 6.28, chunk: currentIndex });
    }
  }

  function coinLine(x, y, z, n, step, dy) {
    for (let i = 0; i < n; i++) coins.push({ x, y: y + (dy ? i * dy : 0), z: z - i * step, ph: rnd() * 6.28, chunk: currentIndex });
  }

  function coinArc(x, y, z0, z1, n, lift) {
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0.5 : i / (n - 1);
      coins.push({
        x: x + Math.sin(t * Math.PI) * (rnd() - 0.5) * 2.4,
        y: y + 1.4 + Math.sin(t * Math.PI) * lift,
        z: lerp(z0, z1, t),
        ph: rnd() * 6.28,
        chunk: currentIndex
      });
    }
  }

  function lamp(c, x, z, y) {
    addBox(c, x - 0.14, y - 0.1, z - 0.14, 0.28, 5.3, 0.28, DARK);
    addBox(c, x - 0.2, y + 5.15, z - 0.2, 1.56, 0.28, 0.28, DARK);
    addGlow(c, x + 0.95, y + 4.85, z, 0.52, 0xffcf82);
    addGlow(c, x + 0.95, y + 4.85, z, 1.05, 0x8a5f28);
  }

  function rubble(c, x0, x1, z0, z1, y) {
    const n = 2 + irand(0, 3);
    for (let i = 0; i < n; i++) {
      const s = rand(0.5, 1.5);
      const h = s * rand(0.4, 0.9);
      addBox(c, rand(x0 + 1, x1 - 1), y - 0.15, rand(z1 + 1, z0 - 1), s, h + 0.15, s, pick(PAL));
    }
  }

  function skyline(c) {
    const n = 1 + irand(0, 2);
    for (let i = 0; i < n; i++) {
      const side = chance(0.5) ? -1 : 1;
      const x = c.x + side * rand(46, 120);
      const w = rand(8, 22);
      const h = rand(14, 56);
      const depth = w * rand(0.7, 1.4);
      c.decor.push({ x: x + (w / 2) * (side < 0 ? -1 : 1), y: -30 + h / 2, z: rand(c.z1, c.z0), w, h, d: depth, color: 0x4c5358 });
    }
  }

  function padChunk(c, half, L) {
    slab(c, c.x - half, c.x + half, c.z0, c.z1, c.y, c.y - 2.6, pick(PAL));
    edgeStripe(c, c.x - half, c.x + half, c.z0, c.y);
    curb(c, c.x - half - 0.7, 0.8, 1.2);
    curb(c, c.x + half - 0.1, 0.8, 1.2);
    if (chance(0.5)) rubble(c, c.x - half, c.x + half, c.z0 - 2, c.z1 + 2, c.y);
  }

  function notchChunk(c, half, L) {
    const hw = rand(5, 8);
    const hd = rand(7, Math.min(L - 6, 15));
    const side = chance(0.5) ? -1 : 1;
    const hx = clamp(c.x + side * (half - hw * 0.5 - 2), c.x - half + hw + 0.5, c.x + half - hw - 0.5);
    const hz0 = c.z0 - rand(2, Math.max(3, L - hd - 4));
    const hz1 = hz0 - hd;
    const g = 0.04;
    const col = pick(PAL);
    slab(c, c.x - half, hx - hw / 2 - g, c.z0, c.z1, c.y, c.y - 2.6, col);
    slab(c, hx + hw / 2 + g, c.x + half, c.z0, c.z1, c.y, c.y - 2.6, col);
    slab(c, hx - hw / 2 + g, hx + hw / 2 - g, c.z0, hz0 + g, c.y, c.y - 2.6, col);
    slab(c, hx - hw / 2 + g, hx + hw / 2 - g, hz1 - g, c.z1, c.y, c.y - 2.6, col);
    edgeStripe(c, hx - hw / 2, hx + hw / 2, hz0, c.y);
    edgeStripe(c, hx - hw / 2, hx + hw / 2, hz1 - 0.42, c.y);
    curb(c, c.x - half - 0.7, 0.8, 1.2);
    curb(c, c.x + half - 0.1, 0.8, 1.2);
    coinArc(hx, c.y, hz0, hz1, 5, 2.6);
  }

  function stairsChunk(c, half, L, d) {
    const up = chance(0.62);
    const n = 4 + irand(0, 2);
    const run = L / n;
    const rise = (up ? 1 : -1) * rand(1.2, 1.7) * (1 + d * 0.4);
    const base = Math.min(c.y, c.y + rise * n) - 4.5;
    const col = pick(PAL);
    for (let i = 0; i < n; i++) {
      const z0 = c.z0 - i * run;
      const z1 = z0 - run;
      const top = c.y + rise * (i + 1);
      slab(c, c.x - half, c.x + half, z0, z1 - 0.15, top, base, col);
      edgeStripe(c, c.x - half, c.x + half, z0, top);
      coinLine(c.x, top + 1.35, z0 - run * 0.5, 2, run * 0.5, 0);
      if (i === n - 1) { c.y = top; lamp(c, c.x + half - 1.1, z0 - run * 0.5, top); }
    }
    c.y = c.y + rise * n;
    addBox(c, c.x - half - 0.7, base, c.z1, 1.5, c.y - base - 0.3, c.z0 - c.z1, DARK);
    addBox(c, c.x + half - 0.8, base, c.z1, 1.5, c.y - base - 0.3, c.z0 - c.z1, DARK);
  }

  function bridgeChunk(c, half, L) {
    const w = rand(5.5, 9);
    const col = pick(PAL);
    slab(c, c.x - w / 2, c.x + w / 2, c.z0, c.z1, c.y, c.y - 2.2, col);
    const span = c.z0 - c.z1;
    addBox(c, c.x - w / 2 - 0.45, c.y - 0.16, c.z1, 0.6, 1.31, span, DARK);
    addBox(c, c.x + w / 2 - 0.15, c.y - 0.16, c.z1, 0.6, 1.31, span, DARK);
    edgeStripe(c, c.x - w / 2, c.x + w / 2, c.z0, c.y);
    coinLine(c.x, c.y + 1.35, c.z0 - 1.5, Math.max(2, Math.round(L / 3)), 3, 0);
    addBox(c, c.x - w / 2 - 4.6, c.y - 3.2, c.z1, 4.5, 3.2, span, DARK);
    addBox(c, c.x + w / 2 + 0.1, c.y - 3.2, c.z1, 4.5, 3.2, span, DARK);
  }

  function gapChunk(c, half, L, d) {
    coinArc(c.x, c.y, c.z0 - 0.5, c.z1 + 0.5, Math.max(3, Math.round(L / 2.4)), 1.6 + d * 1.4);
  }

  function islandsChunk(c, half, L, d) {
    const n = 3 + irand(0, 1);
    const run = L / n;
    const span = half - 4;
    for (let i = 0; i < n; i++) {
      const t = i / Math.max(1, n - 1);
      const z0 = c.z0 - i * run - run * 0.1;
      const padD = clamp(run * rand(0.55, 0.7), 1.6, run - 1.2);
      const z1 = z0 - padD;
      const w = rand(5, 8.5);
      const x = i === n - 1 ? c.x : c.x + Math.sin(t * Math.PI * 1.6) * span * (i % 2 ? -1 : 1);
      const top = c.y + (i === n - 1 ? 0 : (i % 2 ? rand(-2.2, -0.6) : rand(0.4, 2.2)));
      slab(c, x - w / 2, x + w / 2, z0, z1, top, top - 2.2, pick(PAL));
      edgeStripe(c, x - w / 2, x + w / 2, z0, top);
      coinLine(x, top + 1.35, z0 - 1.2, 2, Math.max(1.4, padD * 0.5), 0);
    }
    c.y += rand(-0.8, 0.8);
  }

  function trimmedAgainst(c, box) {
    let x0 = box.x0, x1 = box.x1, z0 = box.z0, z1 = box.z1;
    for (let i = 0; i < solids.length; i++) {
      const o = solids[i];
      if (o.chunk === c.index) continue;
      if (box.y1 <= o.y0 + SKIN || box.y0 >= o.y1 - SKIN) continue;
      const ox0 = Math.max(x0, o.x0);
      const ox1 = Math.min(x1, o.x1);
      const oz0 = Math.max(z0, o.z0);
      const oz1 = Math.min(z1, o.z1);
      if (ox1 - ox0 <= SKIN || oz1 - oz0 <= SKIN) continue;
      if (ox1 - ox0 <= x1 - x0) x1 = ox0 - SKIN;
      else x0 = ox1 + SKIN;
      if (ox1 - ox0 <= oz1 - oz0) z1 = oz0 - SKIN;
      else z0 = oz1 + SKIN;
    }
    if (x1 - x0 < 0.25 || z1 - z0 < 0.25) return null;
    box.x0 = x0; box.x1 = x1; box.z0 = z0; box.z1 = z1;
    return box;
  }

  function resolveChunkOverlaps(c) {
    const keep = [];
    for (const box of c.boxes) {
      const shrunk = trimmedAgainst(c, box);
      if (!shrunk) {
        const i = solids.indexOf(box);
        if (i >= 0) solids.splice(i, 1);
        continue;
      }
      keep.push(box);
    }
    c.boxes = keep;
  }

  function generateOne() {
    const index = chunkIndex;
    currentIndex = index;
    const d = genDifficulty(index);
    let type;
    const r = rnd();
    const wPad = 0.34 - d * 0.12;
    const wNotch = 0.04 + d * 0.12;
    const wStairs = 0.14;
    const wBridge = 0.16 - d * 0.05;
    const wGap = 0.14 + d * 0.12;
    if (index < 4) type = "pad";
    else if (r < wPad) type = "pad";
    else if (r < wPad + wNotch) type = "notch";
    else if (r < wPad + wNotch + wStairs) type = "stairs";
    else if (r < wPad + wNotch + wStairs + wBridge) type = "bridge";
    else if (r < wPad + wNotch + wStairs + wBridge + wGap) type = "gap";
    else type = "islands";

    const half = clamp(11 + rand(-2.5, 2.5), 8.5, 14);
    let L;
    if (type === "gap") L = 5 + d * 6 + rand(0, 3);
    else if (type === "islands") L = rand(15, 24);
    else L = rand(15, 27);

    trackX = clamp(trackX * 0.94 + rand(-3.4, 3.4), -15, 15);
    const z0 = worldZ;
    const c = {
      index, z0, z1: z0 - L, x: trackX, y: trackY, type,
      boxes: [], glows: [], decor: []
    };

    if (type === "pad") padChunk(c, half, L);
    else if (type === "notch") notchChunk(c, half, L);
    else if (type === "stairs") stairsChunk(c, half, L, d);
    else if (type === "bridge") bridgeChunk(c, half, L);
    else if (type === "gap") gapChunk(c, half, L, d);
    else islandsChunk(c, half, L, d);

    if (type !== "gap") {
      if (chance(0.75)) lamp(c, c.x + (chance(0.5) ? -1 : 1) * (half - 1.1), c.z0 - rand(3, L - 3), c.y);
      if (chance(0.55)) coinRow(c.x, c.y, c.z0 - L * 0.5, 4 + irand(0, 2), half * 1.3);
      coinLine(c.x, c.y + 1.35, c.z0 - 2.5, 2 + irand(0, 1), Math.min(4, L * 0.28), 0);
    }

    skyline(c);
    resolveChunkOverlaps(c);

    chunkIndex++;
    worldZ = z0 - L;
    chunks.push(c);
    return c;
  }

  function generateIntro() {
    const c = { index: -1, z0: 34, z1: -52, x: 0, y: 0, type: "intro", boxes: [], glows: [], decor: [] };
    currentIndex = -1;
    slab(c, -18, 18, 34, -52, 0, -3.4, 0x6c7378);
    curb(c, -18.7, 0.8, 1.4);
    curb(c, 17.9, 0.8, 1.4);
    edgeStripe(c, -18, 18, -52, 0);
    lamp(c, -15, 6, 0);
    lamp(c, 15, -18, 0);
    rubble(c, -16, 16, 20, -20, 0);
    coinRow(0, 0, -10, 5, 8);
    skyline(c);
    resolveChunkOverlaps(c);
    chunks.push(c);
    worldZ = -52;
    return c;
  }

  return {
    generateOne,
    generateIntro,
    get solids() { return solids; },
    get coins() { return coins; },
    get chunks() { return chunks; },
    get worldZ() { return worldZ; }
  };
}

export function quantize(v) {
  return Math.round(v * CONST.QUANT) / CONST.QUANT;
}

export function dequantize(q) {
  return q / CONST.QUANT;
}

export function encodeTrace(frames) {
  const n = Math.min(frames.length, CONST.MAX_TRACE_TICKS);
  const bytes = new Uint8Array(n * 5);
  for (let i = 0; i < n; i++) {
    const f = frames[i];
    const qx = Math.max(-32768, Math.min(32767, Math.round(f.wx * CONST.QUANT)));
    const qz = Math.max(-32768, Math.min(32767, Math.round(f.wz * CONST.QUANT)));
    bytes[i * 5] = qx & 0xff;
    bytes[i * 5 + 1] = (qx >> 8) & 0xff;
    bytes[i * 5 + 2] = qz & 0xff;
    bytes[i * 5 + 3] = (qz >> 8) & 0xff;
    bytes[i * 5 + 4] = (f.buttons | 0) & 0xff;
  }
  return bytes;
}

export function decodeTrace(bytes) {
  const n = bytes.length / 5;
  const frames = new Array(n);
  for (let i = 0; i < n; i++) {
    const qx = bytes[i * 5] | (bytes[i * 5 + 1] << 8);
    const qz = bytes[i * 5 + 2] | (bytes[i * 5 + 3] << 8);
    const qxSigned = qx >= 32768 ? qx - 65536 : qx;
    const qzSigned = qz >= 32768 ? qz - 65536 : qz;
    frames[i] = { wx: qxSigned / CONST.QUANT, wz: qzSigned / CONST.QUANT, buttons: bytes[i * 5 + 4] };
  }
  return frames;
}

export const BTN_JUMP = 1;
export const BTN_SPRINT = 2;
export const BTN_MOVING = 4;

export function createSim(seedString) {
  const gen = createGenerator(seedString);
  gen.generateIntro();

  const s = {
    x: 0, y: 0.02, z: CONST.SPAWN_Z,
    vx: 0, vy: 0, vz: 0,
    grounded: true,
    jumps: 0,
    coyote: CONST.COYOTE,
    buffer: 0,
    bestZ: 0,
    worldZ: gen.worldZ,
    mode: MODE_NORMAL,
    hangNX: 0, hangNZ: 0,
    hangX: 0, hangY: 0, hangZ: 0,
    standX: 0, standY: 0, standZ: 0,
    mantleT: 0,
    lastLandImpact: 0,
    events: []
  };

  function emit(e) {
    if (s.events.length < 8) s.events.push(e);
  }

  function ensureWorld(z) {
    let guard = 0;
    while (gen.worldZ > z - 300 && guard++ < 40) gen.generateOne();
  }

  function overlapsSolid(x0, y0, z0, x1, y1, z1) {
    const solids = gen.solids;
    for (let i = 0; i < solids.length; i++) {
      const b = solids[i];
      if (x1 <= b.x0 || x0 >= b.x1) continue;
      if (y1 <= b.y0 || y0 >= b.y1) continue;
      if (z1 <= b.z0 || z0 >= b.z1) continue;
      return true;
    }
    return false;
  }

  function headroomBlocked(x, y, z) {
    const hw = CONST.HW;
    return overlapsSolid(x - hw, y + 0.08, z - hw, x + hw, y + CONST.PH, z + hw);
  }

  function hangClear(x, y, z) {
    const hw = CONST.HW;
    return !overlapsSolid(x - hw, y, z - hw, x + hw, y + CONST.PH, z + hw);
  }

  function startHang(nx, nz, hx, hy, hz, sx, sy, sz) {
    s.mode = MODE_HANG;
    s.hangNX = nx;
    s.hangNZ = nz;
    s.hangX = hx; s.hangY = hy; s.hangZ = hz;
    s.standX = sx; s.standY = sy; s.standZ = sz;
    s.x = hx; s.y = hy; s.z = hz;
    s.vx = 0; s.vy = 0; s.vz = 0;
    s.grounded = false;
    s.buffer = 0;
    emit(EV_GRAB);
  }

  function tryGrab(wx, wz) {
    const solids = gen.solids;
    const px = s.x, py = s.y, pz = s.z;
    const hw = CONST.HW;
    const INSET = hw * 0.6;
    let best = null;
    let bestD = Infinity;

    for (let i = 0; i < solids.length; i++) {
      const b = solids[i];
      const top = b.y1;
      if (top > py + CONST.GRAB_ABOVE || top < py - CONST.GRAB_BELOW) continue;
      const drop = top - CONST.HANG_DROP;
      const standY = top + CONST.STAND_EPS;
      if (b.x1 - b.x0 < hw * 2 || b.z1 - b.z0 < hw * 2) continue;

      const inZ = clamp(pz, b.z0 + INSET, b.z1 - INSET);
      const inX = clamp(px, b.x0 + INSET, b.x1 - INSET);

      // climbing the -X face: hang just outside, mantle up and over onto the top
      if (px < b.x0 - 0.02 && px > b.x0 - CONST.GRAB_REACH && wx > 0.2 && Math.abs(pz - inZ) < 0.4) {
        const hx = b.x0 - hw - 0.03;
        const sx = b.x0 + INSET;
        const d = Math.abs(px - hx);
        if (d < bestD && hangClear(hx, drop, inZ) && !headroomBlocked(sx, standY, inZ)) { bestD = d; best = [-1, 0, hx, drop, inZ, sx, standY, inZ]; }
      }
      if (px > b.x1 + 0.02 && px < b.x1 + CONST.GRAB_REACH && wx < -0.2 && Math.abs(pz - inZ) < 0.4) {
        const hx = b.x1 + hw + 0.03;
        const sx = b.x1 - INSET;
        const d = Math.abs(px - hx);
        if (d < bestD && hangClear(hx, drop, inZ) && !headroomBlocked(sx, standY, inZ)) { bestD = d; best = [1, 0, hx, drop, inZ, sx, standY, inZ]; }
      }
      if (pz < b.z0 - 0.02 && pz > b.z0 - CONST.GRAB_REACH && wz > 0.2 && Math.abs(px - inX) < 0.4) {
        const hz = b.z0 - hw - 0.03;
        const sz = b.z0 + INSET;
        const d = Math.abs(pz - hz);
        if (d < bestD && hangClear(inX, drop, hz) && !headroomBlocked(inX, standY, sz)) { bestD = d; best = [0, -1, inX, drop, hz, inX, standY, sz]; }
      }
      if (pz > b.z1 + 0.02 && pz < b.z1 + CONST.GRAB_REACH && wz < -0.2 && Math.abs(px - inX) < 0.4) {
        const hz = b.z1 + hw + 0.03;
        const sz = b.z1 - INSET;
        const d = Math.abs(pz - hz);
        if (d < bestD && hangClear(inX, drop, hz) && !headroomBlocked(inX, standY, sz)) { bestD = d; best = [0, 1, inX, drop, hz, inX, standY, sz]; }
      }
    }
    if (best) startHang(best[0], best[1], best[2], best[3], best[4], best[5], best[6], best[7]);
  }

  function stepHang(frame, wx, wz) {
    if (frame.buttons & BTN_JUMP) {
      s.mode = MODE_MANTLE;
      s.mantleT = 0;
      emit(EV_MANTLE);
      return;
    }
    const away = wx * s.hangNX + wz * s.hangNZ;
    if (away > 0.4) {
      s.mode = MODE_NORMAL;
      s.x = s.hangX + s.hangNX * 0.12;
      s.z = s.hangZ + s.hangNZ * 0.12;
      s.vy = -1;
      s.buffer = 0;
      s.jumps = 0;
      emit(EV_DROP);
    }
  }

  function stepMantle(dt) {
    s.mantleT += dt / CONST.MANTLE_TIME;
    const t = Math.min(1, s.mantleT);
    s.x = s.hangX + (s.standX - s.hangX) * t;
    s.z = s.hangZ + (s.standZ - s.hangZ) * t;
    s.y = s.hangY + (s.standY - s.hangY) * t;
    if (t >= 1) {
      s.mode = MODE_NORMAL;
      s.y = s.standY;
      s.grounded = false;
      s.coyote = CONST.COYOTE;
      s.jumps = 0;
      s.vy = 0;
      ensureWorld(s.z);
      resolveAxis("x");
      resolveAxis("z");
    }
  }

  function resolveAxis(axis) {
    const solids = gen.solids;
    const half = CONST.HW;
    for (let i = 0; i < solids.length; i++) {
      const b = solids[i];
      if (s.x + half <= b.x0 || s.x - half >= b.x1) continue;
      if (s.y + CONST.PH <= b.y0 + 0.02 || s.y >= b.y1 - 0.02) continue;
      if (s.z + half <= b.z0 || s.z - half >= b.z1) continue;
      if (axis === "x") {
        const toMin = b.x0 - (s.x + half);
        const toMax = b.x1 - (s.x - half);
        if (Math.abs(toMin) < Math.abs(toMax)) s.x = b.x0 - half - 0.001;
        else s.x = b.x1 + half + 0.001;
        s.vx = 0;
      } else {
        const toMin = b.z0 - (s.z + half);
        const toMax = b.z1 - (s.z - half);
        if (Math.abs(toMin) < Math.abs(toMax)) s.z = b.z0 - half - 0.001;
        else s.z = b.z1 + half + 0.001;
        s.vz = 0;
      }
    }
  }

  function step(frame) {
    const dt = CONST.FIXED_DT;
    ensureWorld(s.z);

    const wx = frame.wx;
    const wz = frame.wz;
    const buttons = frame.buttons;
    const sprint = (buttons & BTN_SPRINT) !== 0;
    const moving = (buttons & BTN_MOVING) !== 0;
    const speedCap = sprint ? CONST.SPRINT : CONST.WALK;

    if (s.mode === MODE_HANG) {
      stepHang(frame, wx, wz);
      if (s.mode !== MODE_NORMAL) { if (s.z < s.bestZ) s.bestZ = s.z; return; }
    } else if (s.mode === MODE_MANTLE) {
      stepMantle(dt);
      if (s.z < s.bestZ) s.bestZ = s.z;
      return;
    }

    if (moving) {
      const ax = wx * speedCap - s.vx;
      const az = wz * speedCap - s.vz;
      const al = Math.sqrt(ax * ax + az * az) || 1;
      const am = s.grounded ? CONST.ACC_GROUND : CONST.ACC_AIR;
      const st = Math.min(al, am * dt);
      s.vx += (ax / al) * st;
      s.vz += (az / al) * st;
    } else if (s.grounded) {
      const sp = Math.sqrt(s.vx * s.vx + s.vz * s.vz);
      const drop = Math.min(sp, CONST.ACC_GROUND * 0.9 * dt);
      if (sp > 0.0001) { s.vx -= (s.vx / sp) * drop; s.vz -= (s.vz / sp) * drop; }
    }

    const wasGrounded = s.grounded;
    s.vy += CONST.GRAVITY * dt;
    if (s.vy < -70) s.vy = -70;

    if (frame.buttons & BTN_JUMP) s.buffer = CONST.JUMP_BUFFER;
    s.buffer -= dt;
    s.coyote = wasGrounded ? CONST.COYOTE : s.coyote - dt;
    if (s.buffer > 0) {
      if (s.grounded || s.coyote > 0) {
        s.vy = CONST.JUMP_V;
        s.jumps = 1;
        s.grounded = false;
        s.coyote = 0;
        s.buffer = 0;
        emit(EV_JUMP);
      } else if (s.jumps === 1) {
        s.vy = CONST.DOUBLE_V;
        s.jumps = 2;
        s.buffer = 0;
        emit(EV_DOUBLE);
      }
    }

    s.x += s.vx * dt;
    resolveAxis("x");
    s.z += s.vz * dt;
    resolveAxis("z");
    s.x = clamp(s.x, -CONST.X_LIMIT, CONST.X_LIMIT);

    const prevY = s.y;
    s.y += s.vy * dt;
    s.grounded = false;
    const solids = gen.solids;
    const a0 = s.x - CONST.HW, a1 = s.x + CONST.HW;
    const c0 = s.z - CONST.HW, c1 = s.z + CONST.HW;
    for (let i = 0; i < solids.length; i++) {
      const b = solids[i];
      if (a1 <= b.x0 || a0 >= b.x1) continue;
      if (c1 <= b.z0 || c0 >= b.z1) continue;
      const top = b.y1, bot = b.y0;
      if (s.y >= top || s.y + CONST.PH <= bot) continue;
      if (s.vy <= 0 && prevY >= top - 0.04) {
        s.lastLandImpact = -s.vy;
        s.y = top;
        s.vy = 0;
        s.grounded = true;
      } else if (s.vy > 0 && prevY + CONST.PH <= bot + 0.04) {
        s.y = bot - CONST.PH;
        s.vy = 0;
      }
    }
    s.jumps = s.grounded ? 0 : s.jumps;
    if (s.grounded) s.coyote = CONST.COYOTE;

    if (!wasGrounded && s.grounded) emit(EV_LAND);

    if (s.mode === MODE_NORMAL && !s.grounded && s.vy <= 0.5 && moving) {
      tryGrab(wx, wz);
      if (s.mode === MODE_HANG) { if (s.z < s.bestZ) s.bestZ = s.z; return; }
    }

    if (s.z < s.bestZ) s.bestZ = s.z;
  }

  return { state: s, step, gen };
}

export function simulate(seedString, frames) {
  const sim = createSim(seedString);
  const n = Math.min(frames.length, CONST.MAX_TRACE_TICKS);
  let grabs = 0;
  for (let i = 0; i < n; i++) {
    sim.step(frames[i]);
    const ev = sim.state.events;
    for (let k = 0; k < ev.length; k++) if (ev[k] === EV_GRAB) grabs++;
    ev.length = 0;
  }
  return {
    distance: Math.max(0, -sim.state.bestZ),
    grabs,
    ticks: n
  };
}
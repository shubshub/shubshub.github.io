# lowpolyjumper

**SMOG RUN** — a low-poly endless runner / free-movement platformer in a single HTML file.

Ride the rooftops ahead of a wall of rolling smog. The track is generated chunk by chunk
as you run, so every run is a new sequence of platforms, gaps, bridges and stairs.

## Run it

The page uses ES modules, so it must be served over HTTP (opening `index.html` directly
from disk will not work):

```bash
npx serve .
# or
python -m http.server 8000
```

Then open <http://localhost:8000>.

three.js is loaded from a CDN via an import map, so the first load needs a connection.

## Seeds

The world is fully deterministic: the same seed always produces an identical track,
for every player, on every device.

- **Daily** — seed is today's UTC date, reshuffling at 00:00 UTC. This is the ranked board.
- **Custom** — type any seed. The seed is shareable via the URL (`?seed=...`), so
  everyone who opens that link plays the exact same rooftops.
- **Random** — a fresh practice seed.

World generation is driven by a seeded `mulberry32` PRNG. Only cosmetic randomness
(particle bursts, camera shake, audio noise) still uses `Math.random`.

Difficulty during *generation* is derived from the chunk index, not from the player's
distance, so a seed stays reproducible even if generation changes.

## Leaderboards

The leaderboard is a Cloudflare Worker + D1 database, deployed at
`https://smogrun-leaderboard.smogrun.workers.dev`. See [`worker/README.md`](worker/README.md).

Scores are **verified by replay**: the worker re-simulates the run from its input
trace and uses its own distance as the authoritative score, so inflated scores are
rejected rather than trusted. Click any row marked `▶` on the leaderboard to watch
that run back.

The game runs fully offline if you clear the config:

```js
const LB_URL = "";
```

While `LB_URL` is empty, the board panels show `BOARD OFFLINE`.

## Controls

| Input | Action |
| --- | --- |
| `W` `A` `S` `D` / arrows | Run in any direction |
| `Space` | Jump — press again in mid air to double jump |
| `Shift` | Sprint |
| Drag | Orbit the camera (it auto-follows behind you) |
| Wheel | Zoom |
| `R` | Restart |
| `Esc` | Pause (or exit a replay) |

Click a `▶` row on the leaderboard to watch that run; press `R`, `Esc` or click to exit.

On touch devices the lower-left of the screen is a virtual joystick and the lower-right
is the jump button.

## How it works

Everything lives in `index.html` plus `sim.js` — no build step, no dependencies to install.
`sim.js` is the deterministic simulation shared by the game and the leaderboard worker,
so a submitted run can be verified by replaying it server-side.

- **World generation** — `generateChunk()` picks a chunk type (pad, notch, staircase,
  bridge, gap, islands) from difficulty-weighted rolls, builds it as merged
  `BufferGeometry` with per-vertex colours, and registers `THREE.Box3` colliders.
  Chunks are culled once they pass behind the player.
- **No overlapping geometry** — `addBox` clamps every box to its own chunk's z span,
  and `resolveChunkOverlaps` trims anything that would intrude on a neighbouring chunk,
  so a platform can never spawn inside another.
- **Collision** — the player is an axis-aligned box swept against the chunk boxes:
  a vertical pass resolves landing and head bumps, a per-axis pass pushes out of walls.
- **Smog wall** — a shader-animated plane that trails the player. Its leash shrinks and
  its push speed rises as your distance grows, so standing still is fatal.
- **Rendering** — flat-shaded `MeshLambertMaterial` with vertex colours, one merged mesh
  per chunk, instanced coins, point-sprite particles, ACES tone mapping. Platforms
  receive shadows but do not cast them, which would otherwise cause shadow acne on large
  flat decks.

## Deployment

`index.html` is standalone with an import map, so GitHub Pages needs no build step —
push to a `gh-pages` branch (or `/docs`) and enable Pages in the repo settings.

## Known constraints

- Requires WebGL2-era browser support for `three@0.169`.
- Shadows are a single 2048 cascade that follows the player.
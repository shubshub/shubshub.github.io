
const POKEDEX_OBJECT = [];
const NATURES_OBJECT = [];
const POKEMON_STATS  = [];

function initFilters() {
    initPokedex();
    initNatures();
    initStats();
}

function initPokedex() {
    var dex = exports.BattlePokedex;
    var deduplicator = [];
    POKEDEX_OBJECT.push({value:-1, title:"-- Please Select --"});
    for (var item in dex) {
        var obj = dex[item];
        
        if (deduplicator.indexOf(obj.num) === -1) {
            
            if (obj.isNonstandard === undefined) {
                deduplicator.push(obj.num);
                //console.log(dex[item]);
                POKEDEX_OBJECT.push({value:obj.num,title:obj.name});
            }
            
        }
        
    }
}

function initStats() {
    var dex = exports.BattlePokedex;
    
    for (var item in dex) {
        var obj = dex[item];
        
        POKEMON_STATS.push({value:obj.num, stats:obj.baseStats});
    }
}

function initNatures() {
    
    var natures = ["Hardy", "Lonely", "Brave", "Adamant", "Naughty", "Bold", 
        "Docile", "Relaxed", "Impish", "Lax", "Timid", "Hasty", "Serious", 
        "Jolly", "Naive", "Modest", "Mild", "Quiet", "Bashful", "Rash", 
        "Calm", "Gentle", "Sassy", "Careful", "Quirky"];
    
    NATURES_OBJECT.push({value:-1, title:"-- Please Select --"});
    
    for (var i = 0; i < natures.length; i++) {
        NATURES_OBJECT.push({value:i,title:natures[i]});
    }
    
    
}
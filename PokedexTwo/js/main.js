/* global MAIN_DEX_PAGE, POKEDEX_OBJECT, NATURES_OBJECT, d3 */

var onLoadRun = [];
const SPRITES_CACHE = [];
const GLOBAL_VERSION = "0.0.1";


function init() {
    
    initFilters();
    createPanel(MAIN_DEX_PAGE, ["col-md-6", "panel-default", "col-md-offset-3"], "main_panel", false);
    createPanel("#main_panel", ["col-md-6", "panel-default"], "filters_panel");
    createPanel("#main_panel", ["col-md-6", "panel-default"], "display_panel");
    createPanel("#display_panel", ["col-md-6", "panel-default" ], "pokemon_display", false);
    createPanel("#display_panel", ["col-md-6", "panel-default" ], "stats_display", false);
    createImage("#pokemon_display > .panel-body", null, "pokemon_image");
    addText("#display_panel > .panel-heading", "Information");
    addText("#filters_panel > .panel-heading", "Search Filters");
    createDropdown("#filters_panel > .panel-body", POKEDEX_OBJECT, "Pokemon:", "pokemon_list");
    createDropdown("#filters_panel > .panel-body", NATURES_OBJECT, "Nature: ", "nature_list");
    initEventhandlers();
    console.log("Initialized");
}

function initEventhandlers() {
    $("#pokemon_list").on("change", function() {
        console.log("Hello");
        var pokemon = $(this).val();
        console.log("Pokemon: ", pokemon);
        var sprite_num = SPRITES_CACHE.indexOfByObjectField("value", pokemon);
        console.log("Sprite Num: ", sprite_num);
        if (sprite_num === -1) {
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/" + pokemon,
                success: function(data) {
                    console.log("Pokemon Data");
                    console.log(data);
                    var sprite_src = data.sprites.front_default;
                    d3.select("#pokemon_image").attr("src", sprite_src);
                    SPRITES_CACHE.push({value:data.id,sprite:sprite_src});
                    console.log("Stored in Cache");
                }
            }); 
        } else {
            var obj = SPRITES_CACHE[sprite_num];
            d3.select("#pokemon_image").attr("src", obj.sprite);
            console.log("Pulled from Cache");
        }
       
    });
}

document.addEventListener("DOMContentLoaded", function() {
    
    for (var func of onLoadRun) {
        func();
    }
});

onLoadRun.push(init);
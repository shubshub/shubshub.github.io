/* global MAIN_DEX_PAGE, POKEDEX_OBJECT, NATURES_OBJECT, d3 */

var onLoadRun = [];
const SPRITES_CACHE = [];
const STATS_CACHE = [];
const GLOBAL_VERSION = "0.0.1";


function init() {
    
    initFilters();
    createPanel(MAIN_DEX_PAGE, ["col-md-6", "panel-default", "col-md-offset-3"], "main_panel", false);
    createPanel("#main_panel > .panel-body", ["col-md-5", "panel-default"], "filters_panel");
    createPanel("#main_panel > .panel-body", ["col-sm-7", "panel-default"], "display_panel");
    createPanel("#display_panel > .panel-body", ["col-md-13", "panel-default" ], "pokemon_display", false);
    createPanel("#display_panel > .panel-body", ["col-md-13", "panel-default" ], "stats_display", false);
    createImage("#pokemon_display > .panel-body", null, "front_default", null);
    createImage("#pokemon_display > .panel-body", null, "front_female", null);
    createImage("#pokemon_display > .panel-body", null, "front_shiny", null);
    createImage("#pokemon_display > .panel-body", null, "front_shiny_female", null);
    createTable("#stats_display > .panel-body", "stats_table", ["", "Base Stats", "Level 50", "Level 100", "IV's", "EV's"], ["table-striped"], [null, null, null, null, "width:35px", "width:42px"]);
    addText("#display_panel > .panel-heading", "Information");
    addText("#filters_panel > .panel-heading", "Pokemon");
    createDropdown("#filters_panel > .panel-body", POKEDEX_OBJECT, "Pokemon:", "pokemon_list");
    createDropdown("#filters_panel > .panel-body", NATURES_OBJECT, "Nature: ", "nature_list");
    initEventhandlers();
    console.log("Initialized");
}

function initEventhandlers() {
    $("#pokemon_list").on("change", function() {
        var pokemon = $(this).val();
        if (pokemon == -1) {
            d3.select("#pokemon_image").attr("src", "");
            $("#stats_table tr").remove(); 
            return;
        }
        console.log("Pokemon: ", pokemon);
        var sprite_num = SPRITES_CACHE.indexOfByObjectField("value", pokemon);
        console.log("Sprite Num: ", sprite_num);
        if (sprite_num === -1) {
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/" + pokemon,
                success: function(data) {
                    console.log("Pokemon Data");
                    console.log(data);
                    var f_d = data.sprites.front_default;
                    var f_f = data.sprites.front_female;
                    var f_s = data.sprites.front_shiny;
                    var f_s_f = data.sprites.front_shiny_female;
                    var stats = data.stats;
                    d3.select("#front_default").attr("src", f_d);
                    d3.select("#front_female").attr("src", f_f);
                    d3.select("#front_shiny").attr("src", f_s);
                    d3.select("#front_shiny_female").attr("src", f_s_f);
                    SPRITES_CACHE.push({value:data.id,front_default:f_d, front_female: f_f, front_shiny: f_s, front_shiny_female: f_s_f});
                    STATS_CACHE.push({value:data.id,stats:stats});
                    $("#stats_table tr").remove(); 
                    populateTable("#stats_table", stats);
                    console.log("Stored in Cache");
                }
            }); 
        } else {
            var obj = SPRITES_CACHE[sprite_num];
            var stats = STATS_CACHE[sprite_num];
            d3.select("#front_default").attr("src", obj.front_default);
            d3.select("#front_female").attr("src", obj.front_female);
            d3.select("#front_shiny").attr("src", obj.front_shiny);
            d3.select("#front_shiny_female").attr("src", obj.front_shiny_female);
            $("#stats_table tr").remove(); 
            console.log("Stats", stats);
            populateTable("#stats_table", stats.stats);
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
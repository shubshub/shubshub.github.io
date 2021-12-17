/* global MAIN_DEX_PAGE, POKEDEX_OBJECT */

var onLoadRun = [];

function init() {
    createDropdown(MAIN_DEX_PAGE, POKEDEX_OBJECT);
    console.log("Initialized");
}

document.addEventListener("DOMContentLoaded", function() {
    for (var func of onLoadRun) {
        func();
    }
});

onLoadRun.push(init);
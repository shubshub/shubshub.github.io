/* global d3 */

const MAIN_DEX_PAGE = "#dex_div";

function createDropdown(selector, dropdownArray, htmlClass) {
    /*
     An Input Dropdown Array is Defined as
    [0]: {
        value: 1,
        title: Bulbasaur
    },
    [1]: {
        value: 2,
        title: Ivysaur
    },
    etc
     */
    var elem = d3.select(selector);
    var div = elem.append("div");
    
    var dropdown = div.append("select");
    dropdown.attr("class", "form-control");
    for(const dropdownObject of dropdownArray) {
        var option = dropdown.append("option");
        option.attr("value", dropdownObject.value);
        option.text(dropdownObject.title);
    }
    
}
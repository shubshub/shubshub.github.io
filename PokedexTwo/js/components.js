/* global d3 */

const MAIN_DEX_PAGE = "#dex_div";

Array.prototype.indexOfByObjectField = function(field, value) {
    
    var count = 0;
    for (var item of this) {
        
        //console.log(item);
        if (item[field] == value) {
            return count;
        }
        count++;
    }
    
    return -1;
};

/*
 * 
 * @param {type} selector
 * @param {type} text
 * @returns {addText.elem}
 */
function addText(selector, text) {
    var elem = d3.select(selector);
    elem.text(text);
    
    return elem;
}

/*
 * 
 * @param {type} selector
 * @param {type} classes
 * @param {type} id
 * @param {type} headingTrue
 * @param {type} bodyTrue
 * @returns {createPanel.div}
 */
function createPanel(selector, classes, id, headingTrue, bodyTrue) {
    
    var elem = d3.select(selector);
    var div = elem.append("div");
    classes.push("panel");
    div.attr("class", classes.join(" "));
    div.attr("id", id);
    
    if (headingTrue === undefined || headingTrue) {
        var panelHeader = div.append("div").attr("class", "panel-heading");
    }
    
    if (bodyTrue === undefined || bodyTrue) {
        var panelBody = div.append("div").attr("class", "panel-body");
    }
    
    
    return div;
}


function createImage(selector, src, id) {
    
    var elem = d3.select(selector);
    
    var img = elem.append("img");
    img.attr("src", src);
    img.attr("id", id);
    
    
}


/*
 * 
 * @param {type} selector
 * @param {type} dropdownArray
 * @param {type} label
 * @returns {createDropdown.dropdown}
 */
function createDropdown(selector, dropdownArray, label, id) {
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
    var dropdown = null;
    if (label !== undefined) {
        div.attr("class", "input-group");
        var labelObj = div.append("label");
        labelObj.attr("class", "input-group-addon");
        console.log("Label: ", label);
        labelObj.text(label);
        
    }
    dropdown = div.append("select");
    dropdown.attr("class", "form-control");
    dropdown.attr("id", id);
    for(const dropdownObject of dropdownArray) {
        var option = dropdown.append("option");
        option.attr("value", dropdownObject.value);
        option.text(dropdownObject.title);
    }
    
    return dropdown;
}

/*
 * 
 */
function sortSelect(elem) {
    var tmpAry = [];
    // Retain selected value before sorting
    var selectedValue = elem[elem.selectedIndex].value;
    // Grab all existing entries
    for (var i=0;i<elem.options.length;i++) tmpAry.push(elem.options[i]);
    // Sort array by text attribute
    tmpAry.sort(function(a,b){ return (a.text < b.text)?-1:1; });
    // Wipe out existing elements
    while (elem.options.length > 0) elem.options[0] = null;
    // Restore sorted elements
    var newSelectedIndex = 0;
    for (var i=0;i<tmpAry.length;i++) {
        elem.options[i] = tmpAry[i];
        if(elem.options[i].value == selectedValue) newSelectedIndex = i;
    }
    elem.selectedIndex = newSelectedIndex; // Set new selected index after sorting
    return;
}
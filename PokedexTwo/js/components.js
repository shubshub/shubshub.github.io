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

function createTable(selector, id, headers, classes, columnSize) {
    
    var elem = d3.select(selector);
    var table = elem.append("table");
    classes.push("table");
    table.attr("class", classes.join(" "));
    var colGroup = table.append("colgroup");
    var tableHead = table.append("thead");
    var tableBody = table.append("tbody");
    
    for (var slot in headers) {
            if (!isNaN(slot)) {
                if (Array.isArray(columnSize)) {
                var col = colGroup.append("col");
                if (columnSize[slot] != null) {
                    col.attr("style", columnSize[slot]);
                }

            }

            var th = tableHead.append("th");
            th.attr("scope", "col");
            th.text(headers[slot]);
        }
        
    }
   
   table.attr("id", id);
   
   return id;
}

function addInput(selector, id, type, classes, maxChars, oninput) {
    
    var elem = d3.select(selector);
    
    var input = elem.append("input");
    input.attr("id", id);
    input.attr("type", type);
    if (Array.isArray(classes)) {
        input.attr("class", classes.join(" "));
    } else {
        input.attr("class", classes);
    }
    
    if (maxChars != undefined && maxChars != null) {
        input.attr("maxlength", maxChars);
    }
    
    if (oninput != undefined && oninput != null) {
        input.attr("oninput", oninput);
    }
    
    return input;
}

function onlyNumerics(input) {
    input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
}

function populateTable(selector, data) {
    
    var elem = d3.select(selector);
    var header_array = ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Defense", "Speed"];
    var tbody = elem.select("tbody");
    //var tr = tbody.append("tr");
    for (var item in data) {
        if (!isNaN(item)) {
            var tr = tbody.append("tr");
            var th = tr.append("th");
            th.attr("scope", "row");
            th.text(header_array[item]);
            var base = tr.append("td");
            base.attr("class", "basestat");
            var lvlfifty = tr.append("td");
            lvlfifty.attr("class", "lvlfifty");
            
            var lvlhundred = tr.append("td");
            lvlhundred.attr("class", "lvlhundred");
            console.log(item);
            var base_stat = data[item].base_stat;
            var lvlFiftyStat = BaseToActual(base_stat, 0, 0, 50, 1.0);
            var lvlHundredStat = BaseToActual(base_stat, 0, 0, 100, 1.0);
            
            var ivs = tr.append("td");
            ivs.attr("class", "iv_field");
            
            
            
            var evs = tr.append("td");
            evs.attr("class", "ev_field");
            
            base.text(base_stat);
            if (item == 0) {
                lvlFiftyStat = BaseToActual_HP(base_stat, 0, 0, 50);
                lvlHundredStat = BaseToActual_HP(base_stat, 0, 0, 100);
                addInput(ivs.node(), null, "input", "iv_input hpstat", 2, "onlyNumerics(this)");
                addInput(evs.node(), null, "input", "ev_input hpstat", 3, "onlyNumerics(this)");
            } else {
                addInput(ivs.node(), null, "input", "iv_input regularstat", 2, "onlyNumerics(this)");
                addInput(evs.node(), null, "input", "ev_input regularstat", 3, "onlyNumerics(this)");
            }
            
            lvlfifty.text(lvlFiftyStat);
            lvlhundred.text(lvlHundredStat);
        }
    }
    
    $(".iv_input.hpstat").on("change", function() {
        var value = parseInt($(this).val());
        if (isNaN(value)) {
            value = 0;
        }
        
        console.log("Value: ", value);
        var elem = d3.select(this);
        var td = d3.select(elem.node().parentElement);
        var tr = d3.select(td.node().parentElement);
        
        var baseStat = tr.select(".basestat");
        var lvlFifty = tr.select(".lvlfifty");
        var lvlHundred = tr.select(".lvlhundred");
        var ev_value = parseInt(tr.select(".ev_input").node().value);
        if (isNaN(ev_value)) {
            ev_value = 0;
        }
        var lvlFiftyStat= parseInt(lvlFifty.text());
        var lvlHundredStat = parseInt(lvlHundred.text());
        var baseStatStat = parseInt(baseStat.text());
        
        lvlFifty.text(BaseToActual_HP(baseStatStat, value, ev_value, 50, 1.0));
        lvlHundred.text(BaseToActual_HP(baseStatStat, value, ev_value, 100, 1.0));
        console.log("Change!");
    });
    
    $(".ev_input.hpstat").on("change", function() {
        var value = parseInt($(this).val());
        if (isNaN(value)) {
            value = 0;
        }
        
        console.log("Value: ", value);
        var elem = d3.select(this);
        var td = d3.select(elem.node().parentElement);
        var tr = d3.select(td.node().parentElement);
        
        var baseStat = tr.select(".basestat");
        var lvlFifty = tr.select(".lvlfifty");
        var lvlHundred = tr.select(".lvlhundred");
        var iv_value = parseInt(tr.select(".iv_input").node().value);
        if (isNaN(iv_value)) {
            iv_value = 0;
        }
        
        var lvlFiftyStat= parseInt(lvlFifty.text());
        var lvlHundredStat = parseInt(lvlHundred.text());
        var baseStatStat = parseInt(baseStat.text());
        
        lvlFifty.text(BaseToActual_HP(baseStatStat, iv_value, value, 50, 1.0));
        lvlHundred.text(BaseToActual_HP(baseStatStat, iv_value, value, 100, 1.0));
        console.log("Change!");
    });
    
    $(".iv_input.regularstat").on("change", function() {
        var value = parseInt($(this).val());
        if (isNaN(value)) {
            value = 0;
        }
        
        console.log("Value: ", value);
        var elem = d3.select(this);
        var td = d3.select(elem.node().parentElement);
        var tr = d3.select(td.node().parentElement);
        
        var baseStat = tr.select(".basestat");
        var lvlFifty = tr.select(".lvlfifty");
        var lvlHundred = tr.select(".lvlhundred");
        var ev_value = parseInt(tr.select(".ev_input").node().value);
        if (isNaN(ev_value)) {
            ev_value = 0;
        }
        
        var lvlFiftyStat= parseInt(lvlFifty.text());
        var lvlHundredStat = parseInt(lvlHundred.text());
        var baseStatStat = parseInt(baseStat.text());
        
        lvlFifty.text(BaseToActual(baseStatStat, value, ev_value, 50, 1.0));
        lvlHundred.text(BaseToActual(baseStatStat, value, ev_value, 100, 1.0));
        console.log("Change!");
    });
    
    $(".ev_input.regularstat").on("change", function() {
        var value = parseInt($(this).val());
        if (isNaN(value)) {
            value = 0;
        }
        
        console.log("Value: ", value);
        var elem = d3.select(this);
        var td = d3.select(elem.node().parentElement);
        var tr = d3.select(td.node().parentElement);
        
        var baseStat = tr.select(".basestat");
        var lvlFifty = tr.select(".lvlfifty");
        var lvlHundred = tr.select(".lvlhundred");
        var iv_value = parseInt(tr.select(".iv_input").node().value);
        if (isNaN(iv_value)) {
            iv_value = 0;
        }
        
        var lvlFiftyStat= parseInt(lvlFifty.text());
        var lvlHundredStat = parseInt(lvlHundred.text());
        var baseStatStat = parseInt(baseStat.text());
        
        lvlFifty.text(BaseToActual(baseStatStat, iv_value, value, 50, 1.0));
        lvlHundred.text(BaseToActual(baseStatStat, iv_value, value, 100, 1.0));
        console.log("Change!");

    });
}

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


function createImage(selector, src, id, classes) {
    
    var elem = d3.select(selector);
    
    var img = elem.append("img");
    img.attr("src", src);
    img.attr("id", id);
    if (Array.isArray(classes)) {
        img.attr("class", classes.join(" "));
    }
    
    
    
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
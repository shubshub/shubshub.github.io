var fs = require("fs");

fs.writeFileSync("combined.json", JSON.stringify((Array.apply(null, new Array(621))).map(function(x, i) {

   var parsed = JSON.parse(fs.readFileSync("./" + (i +1) + ".json"));



  return {

    name: parsed.name,

    power: parsed.power,

 id: parsed.id

   }



})))
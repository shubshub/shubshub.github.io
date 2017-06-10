lite_mode = false;
old_3ds = false;
//Mozilla/5.0 (Nintendo 3DS; U; ; en) Version/1.7630.EU
if (navigator.userAgent.indexOf("Chrome") != -1)
{
	var _dex = document.createElement("script");
	_dex.src = "https://play.pokemonshowdown.com/data/pokedex.js";
	document.body.appendChild(_dex);
	var _billy = document.createElement("script");
	_billy.src = "https://play.pokemonshowdown.com/data/abilities.js";
	document.body.appendChild(_billy);
}
if (navigator.userAgent.indexOf("New Nintendo 3DS") == -1)
{
	if (navigator.userAgent.indexOf("Nintendo 3DS") != -1)
	{
		old_3ds = true;
		var _dex = document.createElement("script");
		_dex.src = "http://play.pokemonshowdown.com/data/pokedex.js";
		document.body.appendChild(_dex);
		var _billy = document.createElement("script");
		_billy.src = "http://play.pokemonshowdown.com/data/abilities.js";
		document.body.appendChild(_billy);
	}
	
}
else
{
	var _dex = document.createElement("script");
	_dex.src = "https://play.pokemonshowdown.com/data/pokedex.js";
	document.body.appendChild(_dex);
	var _billy = document.createElement("script");
	_billy.src = "https://play.pokemonshowdown.com/data/abilities.js";
	document.body.appendChild(_billy);
}


function placeHeavyScripts()
{
	var scripts = [];
	if (lite_mode == false)
	{
		
		
		
	}
	var formes = document.createElement("script");
	formes.src = "./formes.js";
	scripts.push(formes);
	
	var evolution = document.createElement("script");
	evolution.src = "./evolutions.js";
	scripts.push(evolution);
		
		
	var names = document.createElement("script");
	names.src = "./names.js";
	scripts.push(names);
	
	var stats = document.createElement("script");
	stats.src = "./3ds_stats.js";
	scripts.push(stats);
	
	//var main = document.createElement("script");
	//main.src = "./main.js";
	//scripts.push(main);
	
	for (var i = 0; i < scripts.length; i++)
	{
		document.body.appendChild(scripts[i]);
	}
}

placeHeavyScripts();

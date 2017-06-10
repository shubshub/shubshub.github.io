var mouseX;
var mouseY;
var show_list = false;
var canvasBottom = document.getElementById("PokeDex_3DS_Bottom");
var canvasTop = document.getElementById("PokeDex_3DS_Top");
if (lite_mode == false)
{
	var version = "1.0";
}
else if (lite_mode == true)
{
	var version = "1.0 - Lite";
}
var versionNum = 10;
var previousPokemon = 0;
var lastPokemonNum = 0;
var lastPokemonName = "";
var levelGlobal = 1;
var natureVal = 0;
var topPageNumber = 0; //Set starting Page number to 0, Which is the Main UI for the Top Screen
var bottomPageNumber = 0; //Set starting Page number to 0, Which is the Main UI for the Bottom Screen 

var globalForme = 0;
var previousForme = 0;

var isShiny = false;

var _bottomContext = canvasBottom.getContext("2d");

String.prototype.capitalize = function(){
       return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
      };

window.setInterval(function()
{
	window.scrollTo(0,265);
}, 50);


function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}


function Button(x, y, width, height, image)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.image = image;
	this._amount = 0;
	this.redraw = function() {
		var context = _bottomContext;
		var imageSource = this.image;
		var imageObj = new Image();
		context.clearRect(this.x, this.y, this.width, this.height);
		imageObj.onload = function()
		{
			context.drawImage(imageObj, this.x, this.y);
		};
		imageObj.src = imageSource;
	}
}

var _spriteSheet = new Image();

function buttonPlace(thisButton)
{
	//var canvas = canvasBottom
	//var context = canvas.getContext('2d');
	var context = _bottomContext;
	var imageSource = thisButton.image;
	var imageObj = new Image();
	imageObj._button = thisButton;
	imageObj._retry = function() {
		buttonPlace(this._button);
	}
	imageObj.onload = function()
	{
		context.drawImage(imageObj, thisButton.x, thisButton.y);
	};
	imageObj.onerror = function(e) {
		if (this._button._amount < 10)
		{
			this._button._amount+=1;
			this._retry();
		}
		else if (this._button._amount >= 10)
		{
			this._button._amount = 0;
		}
		
	}
	imageObj.src = imageSource;
}

function changePage()
{
	var dropdownID = document.getElementById("other_data_dropdown");
	var pageVal = dropdownID.options[dropdownID.selectedIndex].value;
	topPageNumber = parseInt(pageVal);
	bottomPageNumber = parseInt(pageVal);
	bottomUIhandler();
	DrawUI(lastPokemonNum,lastPokemonName);
}

function getPosition(event) {
    var x,
        y;
	canvasElement = canvasBottom
    if (event.x != undefined && event.y != undefined) {
        x = event.x;
        y = event.y;
    } else {
        x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= canvasElement.offsetLeft;
    y -= canvasElement.offsetTop;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
	if (navigator.userAgent.indexOf('New Nintendo 3DS') != -1)
	{
		y+=529;
	}
    mouseX = x;
    mouseY = y;
	//Check to see if a Button has been pressed
	//checkButtonClick(kantoButton,0);
	//checkButtonClick(johtoButton,1);
	//checkButtonClick(hoennButton,2);
	//checkButtonClick(sinnohButton,3);
	//checkButtonClick(unovaButton,4);
	//checkButtonClick(kalosButton,5);
	//checkButtonClick(mpoButton,6);
	
	checkButtonClick(changelogButton,7);
	checkButtonClick(aboutButton,8);
	checkButtonClick(creditsButton,9);
	checkButtonClick(evButton,10);
	checkButtonClick(ivButton,11);
	checkButtonClick(levelButton,12);
	checkButtonClick(natureButton,13);
	
	//checkButtonClick(otherdataButton,14);
	if (bottomPageNumber == 1)
	{
		checkButtonClick(gameSelectButton,15);
	}
	checkButtonClick(searchPokemonButton,16);
	checkButtonClick(formeButton, 17);
	checkButtonClick(regionButton, 18);
	checkButtonClick(evolutionsButton, 19);
	checkButtonClick(refreshUIButton, 20);
	checkButtonClick(shiny_enable_button, 21);
}

window.showState = function (elementId) {
    var dropdown = document.getElementById(elementId);
    var _evt;
    _evt = document.createEvent('MouseEvents');
    _evt.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	_evt.onerror = function(e) {
		alert(e);
	}
	dropdown.onerror = function(e) {
		alert(e);
	}
    var _status = dropdown.dispatchEvent(_evt);

	
	//alert(_status); 
}

function displayPokemon()
{
	showState('dropdown_table');
}

function checkButtonClick(thisButton,buttonType)
{
	buttonX = thisButton.x;
	buttonY = thisButton.y;
	buttonWidth = thisButton.width;
	buttonHeight = thisButton.height;
	if (mouseX > buttonX && 
    mouseX < buttonX + buttonWidth && 
    mouseY > buttonY && 
    mouseY < buttonY + buttonHeight) 
	{
    //alert("Button Clicked!"); 
	/*
	Button Types
	0: Kanto Region Select
	1: Johto Region Select
	2: Hoenn Region Select
	3: Sinnoh Region Select
	4: Unova Region Select
	5: Kalos Region Select
	6: MPO Download Button
	7: Changelog Button
	8: About Button
	9: Credits Button
	10: EV Button
	11: IV Button
	12: Level Button
	13: Nature Button
	14: Other Data Button
	15: Game Select Button
	16: Search Pokemon Button
	17: Select Forme Button
	18: Region Select Button
	19: List Evolutions
	20: Refresh UI
	21: Shiny Button
	*/
		switch(buttonType)
		{
			case 0:
				//showState('dropdown_dex');
				
				break;
			case 1:
				showState('dropdown_johto');
				break;
			case 2:
				showState('dropdown_hoenn');
				break;
			case 3:
				showState('dropdown_sinnoh');
				break;
			case 4:
				showState('dropdown_unova');
				break;
			case 5:
				showState('dropdown_kalos');
				break;
			case 6:
				window.open(document.getElementById('mpo_download').href);
				break;
			case 7:
				showChangelog();
				break;
			case 8:
				showAbout();
				break;
			case 9:
				showCredits();
				break;
			case 10:
				showState('ev_dropdown');
				break;
			case 11:
				showState('iv_dropdown');
				break;
			case 12:
				getLevel();
				break;
			case 13:
				showState('alt_nature');
				break;
			case 14:
				showState('other_data_dropdown');
				break;
			case 15:
				showState('games_list');
				break;
			case 16:
				searchPokemon();
				break;
			case 17:
				changeFormes();
				break;
			case 18:
				showState('dropdown_regions');
				break;
			case 19:
				getEvolutions();
				break;
			case 20:
				refreshUI();
				break;
			case 21:
				enableShiny(shiny_enable_button);
				break;
			default:
				alert("Something went wrong =/");
				break;
		}
	}
}

function refreshUI()
{
	DrawUI(lastPokemonNum,lastPokemonName, parseInt(globalForme));
	bottomUIhandler();
	
}

function enableShiny(_button)
{
	switch(isShiny)
	{
		case false:
			isShiny = true;
			_button.image = './images/UI/buttons/shiny_box_enabled.png';
			break;
		case true:
			isShiny = false;
			_button.image = './images/UI/buttons/shiny_box_disabled.png';
			break;
	}
	_button.redraw();
	DrawUI(lastPokemonNum,lastPokemonName, parseInt(globalForme));
	
}

function pushEvolution(_input, _dex)
{
	var output = _input;
	output.push({dex: parseInt(_dex), name: getPokemon(parseInt(_dex))})
	return output;
}

function populateList(input)
{
	
	var _dex = [];
	var maxMins = {	kanto: [1, 151], johto: [152, 251], hoenn: [252, 386], sinnoh: [387, 493],  unova: [494, 649], kalos: [650, 721], alola: [722, 802]	}
	var _min = maxMins[input][0];
	var _max = maxMins[input][1];
	
	var list = new Array(_max - (_min - 1));
	list.fill(0);
	
	list.filter(function(_val, _index, _array) {
		_array[_index] = getPokemon(_index + _min);
		_dex.push(_index + _min);
	});
	
	var drpdwn = document.getElementById("dropdown_table");
	while (drpdwn.firstChild) 
	{
		drpdwn.removeChild(drpdwn.firstChild);
	}
	for (var i = 0; i < list.length; i++)
	{
		
		var opt = document.createElement("option");
		opt.setAttribute("value", _dex[i]);
		opt.innerText = list[i].capitalize();
		drpdwn.appendChild(opt);
	}
	drpdwn.value = lastPokemonNum;
	try {
		showState("dropdown_table");
	} catch (e) {
		alert(e);
	}	
}

function showRegion(elementId)
{
	if(old_3ds)
	{
		alert("This feature is not currently supported on Old 3DS");
		return;
	}
	var e = document.getElementById(elementId);
	var value = e.options[e.selectedIndex].value;
	var text = e.options[e.selectedIndex].text;
	populateList(value);
	//displayPokemon();
	e.selectedIndex = 0;
	
	if (old_3ds == true)
	{
		alert("Due to the way o3DS works tap on the screen after this message to display the Pokemon List");
		show_list = true;
	}
	//globalForme = parseInt(value);
}

function changeFormes()
{
	var numFormes = countForme(lastPokemonNum);
	var formeElement = document.getElementById("dropdown_formes");
	while (formeElement.firstChild) 
	{
		formeElement.removeChild(formeElement.firstChild);
	}

	if (numFormes == 0)
	{
		alert("There are no alternate Formes for this Pokémon");
		return;
	}
	for (var i = 0; i < numFormes; i++)
	{
		
		var opt = document.createElement("option");
		opt.setAttribute("value", i);
		opt.innerText = getForme(lastPokemonNum, i).capitalize();
		if (opt.innerText == "")
		{
			opt.innerText = "Regular";
		}
		formeElement.appendChild(opt);
	}
	
	showState('dropdown_formes');
}

function searchPokemon()
{
	
	var minimumPercentage = 0.8;
	
	var pokemonFound = 0;
	var temp_dex = 0;
	var temp_name = "";
	var pokemonID = prompt("Search Pokémon by Number or Name","");
	var pokemonTemp = parseInt(pokemonID);
	if (isNaN(pokemonTemp))
	{
		//Assume is Name and cycle through each dropdown list
		temp_dex = getPokemon(pokemonID);
		if (temp_dex !=0)
		{
			pokemonFound = 1;
			lastPokemonNum = temp_dex;
			lastPokemonName = getPokemon(lastPokemonNum);
		}
		if (pokemonFound !=1)
		{
			alert("That Pokémon does not Exist!");
		}
		if (pokemonFound == 1)
		{
			DrawUI(lastPokemonNum,lastPokemonName, globalForme);
		}
	}
	else
	{
		if ((pokemonTemp > 0) && (pokemonTemp <= 802))
		{
			lastPokemonNum = pokemonTemp;
			temp_name = getPokemon(pokemonTemp);
			if (temp_name != "")
			{
				returnName(pokemonTemp, globalForme);
			}
			
		}
		else
		{
			alert("That Pokémon does not Exist!");
		}
	}
	return;
}

function showAbout()
{
	alert("Web Pokédex Version "+version+"\nJanuary 2016 - Present\nDeveloped by Shubshub\nWe are not affiliated with Nintendo or The Pokémon Company\nAll Pokémon Images and 3D Models are Copyrighted images owned by The Pokémon Company");
}
function showCredits()
{
	alert("Web Pokédex Credits");
	alert("Programming\nShubshub");
	alert("Bug Testing\\UI Design\nElyosOfTheAbyss");
	alert("Pokémon Sprites from Pokémon Showdown");
	alert("Alola Pokémon Stat Data\nBulbapedia");
	alert("New 3DS Support Testing\nElyosOfTheAbyss\nSil3nt Pr0digy");
}


function showChangelog()
{
	var changelogText = new Array(versionNum);
	
	
	//Changelog Array
	changelogText[0] = "v0.1 - Initial Version, Some Pokémon images are displayed, All 5 Region buttons added";
	changelogText[1] = "v0.2 - Some MPO Images have been Added and Displayed in 3D";
	changelogText[2] = "v0.3 - Stats are now displayed on Top Screen";
	changelogText[3] = "v0.4 - All Base Stats have been Added and Display Correctly\nThanks to pokeapi.co for the JSON Data";
	changelogText[4] = "v0.5 - Minor Stability Update: Changed Image Links to short form for when Website changes Location things don't break\nAdded all Unova Region Pokémon\nStable enough to stand on without falling off while Sober";
	changelogText[5] = "v0.6 - All Kalos Pokémon added except Hoopa, Diancie and Volcanion\nAwesome Looking User Interface Courtesy of ElyosOfTheAbyss\nOther Minor Bug Fixes\nStable enough to balance a fork on now\nWe Apologize for the Slow Loading Times not much we can do";
	changelogText[6] = "v0.7 - Added Natures, Levels, IVs, EVs, Actual Stat Display, A few more MPO Images, Bug Fixes, Diance Volcanion and Hoopa are now added, Stable enough to keep a Horse in now!";
	changelogText[7] = "v0.8 - NEW 3DS SUPPORT!\nCan now choose to set All IVs to 31 or to 0";
	changelogText[8] = "v0.9 - Added Quick Find Button for easy Pokémon searching\nThe selected Pokémon's types are now displayed in the top right corner as well";
	
	changelogText[9] = [];
	changelogText[9][0] = "v1.0 - THE BIG UPDATE";
	changelogText[9][1] = "Fixed bug with changing natures setting the Pokémon's name to undefined";
	changelogText[9][2] = "Added all Alola Pokémon and Formes";
	changelogText[9][3] = "Changed the UI layout on the bottom to allow for more button space by moving regions into their own dropdown selector";
	changelogText[9][4] = "Added a new Evolution button to list a Pokémon's evolutions and to jump to one of them";
	changelogText[9][5] = "Changed the way searching by name works so now it allows for minimal spelling mistakes IE: Feraligater now returns Feraligatr";
	changelogText[9][6] = "Made the changelog way easier to read for when there is a big changelog";
	changelogText[9][7] = "Added Shiny Pokémon";
	changelogText[9][8] = "Replaced jQuery with a custom lib that is smaller and only has what we need";
	changelogText[9][9] = "Literally every single image now added";
	//Changelog End
	
	
	
	var answer = confirm("View all Versions in Changelog?\n(Selecting Cancel will only display the latest version changes");
	alert("Changes since last version");
	if (answer)
	{
		for (var i = 0; i < changelogText.length; i++)
		{
			if (changelogText[i].constructor == Array)
			{
				for (var j = 0; j < changelogText[i].length; j++)
				{
					alert(changelogText[i][j]);
				}
			}
			else
			{
				alert(changelogText[i]);
			}
		}
	}
	else
	{
		if (changelogText[changelogText.length-1].constructor == Array)
		{
			for (var j = 0; j < changelogText[changelogText.length-1].length; j++)
			{
				alert(changelogText[changelogText.length-1][j]);
			}
		}
		else
		{
			alert(changelogText[changelogText.length-1]);
		}			
	}
	
}
function bottomUIhandler()
{
	var bottomUI = new Image();
	var bottomContext = _bottomContext;
	bottomContext.clearRect(0,0,canvasBottom.width,canvasBottom.height);
	bottomUI.onload = function()
	{
		bottomContext.drawImage(bottomUI,0,0);
		buttonPlace(refreshUIButton);
		buttonPlace(shiny_enable_button);
		//buttonPlace(kantoButton)
		//buttonPlace(johtoButton);
		//buttonPlace(hoennButton);
		//buttonPlace(sinnohButton);
		//buttonPlace(unovaButton);
		//buttonPlace(kalosButton);
		//buttonPlace(otherdataButton);
		//buttonPlace(mpoButton); //MPO Button removed Temporarily until its a finished feature
		buttonPlace(changelogButton);
		buttonPlace(aboutButton);
		buttonPlace(creditsButton);
		buttonPlace(evButton);
		buttonPlace(ivButton);
		buttonPlace(levelButton);
		buttonPlace(natureButton);
		buttonPlace(evolutionsButton);
		buttonPlace(regionButton);
		buttonPlace(formeButton);
		if (bottomPageNumber == 1)
		{
			buttonPlace(gameSelectButton);
		}
		buttonPlace(searchPokemonButton);
	}
	bottomUI.src = './images/UI/background/bottomUI_new.png';
	

}
var ctx = canvasBottom.getContext("2d");

//All the Buttons must be Instantiated here
/*var kantoButton = new Button(7,59,64,24,'./images/UI/buttons/clickButton.png');
var johtoButton = new Button(71,59,64,24,'./images/UI/buttons/Johot.png');
var hoennButton = new Button(135,59,64,24,'./images/UI/buttons/Hoenn.png');
var sinnohButton = new Button(199,59,64,24,'./images/UI/buttons/Sinnoh.png');
var unovaButton = new Button(263,59,64,24,'./images/UI/buttons/Unova.png');
var kalosButton = new Button(327,59,64,24,'./images/UI/buttons/Kalos.png');
var otherdataButton  = new Button(138,89,122,24,'./images/UI/buttons/otherDataButton.png');
var gameSelectButton = new Button(278,89,122,24,'./images/UI/buttons/gameSelectButton.png');*/
var refreshUIButton = new Button(374, 0, 24, 24, './images/UI/buttons/refresh_ui_button.png');
var shiny_enable_button = new Button(0,0, 24, 24, './images/UI/buttons/shiny_box_disabled.png');

var searchPokemonButton = new Button(0,29,122,24,'./images/UI/buttons/searchPokeButton.png');


var regionButton = new Button(0, 59, 122, 24, './images/UI/buttons/selectRegion.png');
var formeButton = new Button(0, 89, 122, 24,'./images/UI/buttons/selectForme.png');


//Left Sidebar
var changelogButton = new Button(0,225,128,16,'./images/UI/buttons/changelog.png');
var aboutButton = new Button(0,207,128,16,'./images/UI/buttons/about.png');
var creditsButton = new Button(0,189,128,16,'./images/UI/buttons/credits.png');

//Right Sidebar
var mpoButton = new Button(352,225,49,18,'./images/UI/buttons/mpo_download.png');
var evButton = new Button(352,207,49,18,'./images/UI/buttons/EVbutton.png');
var ivButton = new Button(352,189,49,18,'./images/UI/buttons/IVbutton.png');
var levelButton = new Button(352,171,49,18,'./images/UI/buttons/levelButton.png');
var natureButton = new Button(352,153,49,18,'./images/UI/buttons/natureButton.png');
var evolutionsButton = new Button(276,29,122,24, './images/UI/buttons/listEvolutions.png');





bottomUIhandler();


var ctx_Top = canvasTop.getContext("2d");
DrawUI();
ctx_Top.stroke();
ctx_Top.stroke();
function DrawStatWord()
{
	ctx_Top.font = "15px Arial";
	ctx_Top.fillText("Base Stats",129,60);
	ctx_Top.fillText("Health: ",129,80);
	ctx_Top.fillText("Attack: ",129,100);
	ctx_Top.fillText("Defense: ",129,120);
	ctx_Top.fillText("Sp. Attack: ",129,140);
	ctx_Top.fillText("Sp. Defense: ",129,160);
	ctx_Top.fillText("Speed: ",129,180);
}
function DrawStatWord_Stats(value)
{
	ctx_Top.font = "15px Arial";
	getStats(value);
}
function getNature(natureID)
{
	var drawString = "";
	natureID = parseInt(natureID);
	switch(natureID)
	{
		case 0:
			drawString = "Hardy";
			break;
		case 1:
			drawString = "Lonely";
			break;
		case 2:
			drawString = "Brave";
			break;
		case 3:
			drawString = "Adamant";
			break;
		case 4:
			drawString = "Naughty";
			break;
		case 5:
			drawString = "Bold";
			break;
		case 6:
			drawString = "Docile";
			break;
		case 7:
			drawString = "Relaxed";
			break;
		case 8:
			drawString = "Impish";
			break;
		case 9:
			drawString = "Lax";
			break;
		case 10:
			drawString = "Timid";
			break;
		case 11:
			drawString = "Hasty";
			break;
		case 12:
			drawString = "Serious";
			break;
		case 13:
			drawString = "Jolly";
			break;
		case 14:
			drawString = "Naive";
			break;
		case 15:
			drawString = "Modest";
			break;
		case 16:
			drawString = "Mild";
			break;
		case 17:
			drawString = "Quiet";
			break;
		case 18:
			drawString = "Bashful";
			break;
		case 19:
			drawString = "Rash";
			break;
		case 20:
			drawString = "Calm";
			break;
		case 21:
			drawString = "Gentle";
			break;
		case 22:
			drawString = "Sassy";
			break;
		case 23:
			drawString = "Careful";
			break;
		case 24:
			drawString = "Quirky";
			break;
		default:
			drawString = "???";
			break;
	}
	return drawString;
	
}
function returnStringVal(value)
{
	var textString = value;
	if ((textString < 100) && (textString > 9))
	{
		textString = "0" + textString;
	}
	else if (textString < 10)
	{
		textString = "00" + textString;
	}
	
	return textString;
}




function DrawUI(value,text, forme)
{
	//This function handles everything to do with the User Interface on the Top Screen
	var topCanvasCTX = canvasTop.getContext('2d');
	var bottomCanvasCTX = canvasBottom.getContext('2d');
	
	var use = value
	var imageObj = new Image();
	var topCanvasUI = new Image();
	var bottomCanvasUI = new Image();
	lastPokemonName = text;

	if (lastPokemonNum != previousPokemon)
	{
		globalForme = 0;
		forme = 0;
		text = getPokemon(value);
		console.log("Forme has Changed");
	}
	if (globalForme != previousForme)
	{
		text = returnName(value, globalForme);
		previousForme = globalForme;
	}
	
	previousPokemon = lastPokemonNum;
	if (typeof getForme != 'undefined')
	{
		var thisForme = getForme(value, forme);
	}
	else
	{
		var thisForme = "";
	}
	//alert(thisForme);
	//alert(thisForme);
	
	switch(topPageNumber)
	{
		case 0:
			//Case Start - Main User Interface
			topCanvasUI.onload = function()
			{
				topCanvasCTX.clearRect(0,0,canvasTop.width,canvasTop.height);
				topCanvasCTX.drawImage(topCanvasUI,0,0);
				ctx_Top.font = "20px Arial";
				ctx_Top.fillStyle = 'white';
				ctx_Top.fillText("Web Pokédex v"+version,10,25);
				
				ctx_Top.stroke();
				ctx_Top.stroke();
				//document.getElementById("mpo_download").href = './images/mpo/'+use+'.mpo';
				var nature = document.getElementById("alt_nature");
				natureVal = nature.options[nature.selectedIndex].value;
				var natureString = getNature(natureVal);
				ctx_Top.font = "15px Arial";
				
				//8, 40
				//enableAllGames();
				if ((use !=0) && !(isNaN(use)))
				{
					ctx_Top.fillText(natureString,35,215);
					ctx_Top.fillText(levelGlobal,35,199);
					ctx_Top.fillStyle = 'black';
					ctx_Top.font = "20px Arial";
					var valueText = returnStringVal(value);
					
					ctx_Top.fillText(valueText +": " + text,8,59);
					ctx_Top.fillStyle = 'white';
					imageObj.onload = function() 
					{
						if (thisForme == "alola" && value == 103)
						{
							topCanvasCTX.drawImage(imageObj, 15, 77 - (imageObj.height - 96),96, imageObj.height);
						}
						else
						{
							topCanvasCTX.drawImage(imageObj, 15, 77,96,96);
						}
					};

				}
				ctx_Top.fillStyle = 'black';
				if (use != undefined)
				{
					if (thisForme != "" && thisForme != undefined)
					{
						DrawStatWord_Stats(use + "-" + thisForme);
					}
					else
					{
						DrawStatWord_Stats(use);
					}
				}
				
				
				
				
			}
			
			topCanvasUI.src = './images/UI/background/TopUI.png';
			if (value != undefined)
			{
				var _temp = value;
				if (isShiny)
				{
					_temp = "new_shiny/" + value;
				}
				else
				{
					_temp = "new_sprites/" + value;
				}
				if (thisForme != "" && thisForme != undefined)
				{
					imageObj.src = './images/pokemon/'+_temp+'-'+thisForme+'.png';
				}
				else
				{
					imageObj.src = './images/pokemon/'+_temp+'.png';
				}
			}
			break;
			//Case End
		case 1:
			//Case Start
			topCanvasUI.onload = function()
			{
				topCanvasCTX.clearRect(0,0,canvasTop.width,canvasTop.height);
				topCanvasCTX.drawImage(topCanvasUI,0,0);
				ctx_Top.font = "20px Arial";
				ctx_Top.fillStyle = 'white';
				ctx_Top.fillText("Web Pokédex v"+version,10,25);
				ctx_Top.stroke();
				ctx_Top.stroke();
				document.getElementById("mpo_download").href = './images/mpo/'+use+'.mpo';
				ctx_Top.fillStyle = 'black';
				ctx_Top.font = "20px Arial";
				enableAllGames();
				if ((use !=0) && !(isNaN(use)))
				{
					disableGameSelect(use); //Disable Certain Games to be Selected based on the Pokemon Number
					var valueText = returnStringVal(value);
					ctx_Top.fillText(valueText +": " + text,8,59);
				}
				ctx_Top.fillText("???",250,59);
				ctx_Top.fillStyle = 'white';
			}
			break;
			//Case End
	}
}
function enableAllGames()
{
	var opt = document.getElementById("games_list").getElementsByTagName("option");
	for (var i = 0; i < opt.length; i++)
	{
		opt[i].disabled = false;
	}
}
function disableGameSelect(pokemonID)
{
	//Do stuff here
	var opt = document.getElementById("games_list").getElementsByTagName("option");
	if (pokemonID > 151) //Johto or Higher
	{
		opt[1].disabled = true;
		opt[2].disabled = true;
		opt[3].disabled = true;
		opt[4].disabled = true;
	}
	if (pokemonID > 251) //Hoenn or Higher
	{
		opt[5].disabled = true;
		opt[6].disabled = true;
		opt[7].disabled = true;
	}
	if (pokemonID > 386) //Sinnoh or Higher
	{
		opt[8].disabled = true;
		opt[9].disabled = true;
		opt[10].disabled = true;
		opt[11].disabled = true;
		opt[12].disabled = true;
	}
	if (pokemonID > 493) //Unova or Higher
	{
		opt[13].disabled = true;
		opt[14].disabled = true;
		opt[15].disabled = true;
		opt[16].disabled = true;
		opt[17].disabled = true;
	}
	if (pokemonID > 649) //Kalos or Higher
	{
		opt[18].disabled = true;
		opt[19].disabled = true;
		opt[20].disabled = true;
		opt[21].disabled = true;
	}
	//Add Function to Disable Games based on Pokemon being in that game
}

function getLevel()
{
	var levelPrompt = prompt("Set Pokémon Level 1-100","1");
	if (levelPrompt !=null)
	{
		levelPrompt = parseInt(levelPrompt);
		if ((levelPrompt <=100) && (levelPrompt >=1) && !(isNaN(levelPrompt)))
		{
			levelGlobal = parseInt(levelPrompt);
			updateTop(lastPokemonNum,lastPokemonName);
		}
		else
		{
			alert("Level must be from 1-100");
			getLevel();
		}
	}
}
function updatePokemon(elementId)
{
	var e = document.getElementById(elementId);
	var value = e.options[e.selectedIndex].value;
	var text = e.options[e.selectedIndex].text;
	lastPokemonNum = value;
	lastPokemonName = text;
	if (lastPokemonNum != previousPokemon)
	{
		globalForme = 0;
		console.log("Forme has Changed");
	}
	previousPokemon = lastPokemonNum;
	e.selectedIndex = 0;
	if (countForme(lastPokemonNum) > 0)
	{
		DrawUI(lastPokemonNum,lastPokemonName, parseInt(globalForme));
	}
	else
	{
		DrawUI(lastPokemonNum,lastPokemonName);
	}
	
}

function updateFormes(elementId)
{
	var e = document.getElementById(elementId);
	var value = e.options[e.selectedIndex].value;
	var text = e.options[e.selectedIndex].text;
	globalForme = parseInt(value);
	lastPokemonName = returnName(lastPokemonNum, globalForme);
	//alert(globalForme);
	//DrawUI(lastPokemonNum,lastPokemonName, globalForme);
}
function updateTop(value,text)
{
	//This Function is Useful for updating the UI without changing the Pokemon
	if (value !=0)
	{
		DrawUI(value,text, globalForme);
	}
}


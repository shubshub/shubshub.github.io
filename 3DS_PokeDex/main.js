var mouseX;
var mouseY;
var canvasBottom = document.getElementById("PokeDex_3DS_Bottom");
var canvasTop = document.getElementById("PokeDex_3DS_Top");
var version = "1.0 - Dev";
var versionNum = 9;
var lastPokemonNum = 0;
var lastPokemonName = "";
var levelGlobal = 1;
var natureVal = 0;
var abilityID = 0;
var topPageNumber = 0; //Set starting Page number to 0, Which is the Main UI for the Top Screen
var bottomPageNumber = 0; //Set starting Page number to 0, Which is the Main UI for the Bottom Screen


window.setInterval(function()
{
	window.scrollTo(0,265);
}, 50);
function Button(x, y, width, height, image)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.image = image;
}
function buttonPlace(thisButton)
{
	var canvas = canvasBottom
	var context = canvas.getContext('2d');
	var imageSource = thisButton.image;
	var imageObj = new Image();
	imageObj.onload = function()
	{
		context.drawImage(imageObj, thisButton.x, thisButton.y);
	};
	imageObj.src = imageSource;
}

function changePage()
{
	var dropdownID = document.getElementById("other_data_dropdown");
	pageVal = dropdownID.options[dropdownID.selectedIndex].value;
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
	if (navigator.userAgent.indexOf('New Nintendo 3DS') != -1) //New Nintendo 3DS not Supported Yet
	{
		y+=529;
	}
    mouseX = x;
    mouseY = y;
	//Check to see if a Button has been pressed
	checkButtonClick(kantoButton,0);
	checkButtonClick(johtoButton,1);
	checkButtonClick(hoennButton,2);
	checkButtonClick(sinnohButton,3);
	checkButtonClick(unovaButton,4);
	checkButtonClick(kalosButton,5);
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
	checkButtonClick(damagePassButton,17);
}

window.showState = function (elementId) {
    var dropdown = document.getElementById(elementId);
    var event;
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);
    dropdown.dispatchEvent(event);
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
	17: Damage Password Button
	*/
		switch(buttonType)
		{
			case 0:
				showState('dropdown_dex');
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
				//window.open(document.getElementById('mpo_download').href);
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
				showState('nature_dropdown');
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
				dropdownPageSwap("move_list",2);
				break;
			default:
				alert("Something went wrong =/");
				break;
		}
	}
}

function searchPokemon()
{
	var pokemonFound = 0;
	var pokemonID = prompt("Search Pokémon by Number or Name","");
	var pokemonTemp = parseInt(pokemonID);
	if (isNaN(pokemonTemp))
	{
		//Assume is Name and cycle through each dropdown list
		var kanto = document.getElementById("dropdown_dex").getElementsByTagName("option");
		var johto = document.getElementById("dropdown_johto").getElementsByTagName("option");
		var hoenn = document.getElementById("dropdown_hoenn").getElementsByTagName("option");
		var sinnoh = document.getElementById("dropdown_sinnoh").getElementsByTagName("option");
		var unova = document.getElementById("dropdown_unova").getElementsByTagName("option");
		var kalos = document.getElementById("dropdown_kalos").getElementsByTagName("option");
		if (pokemonFound !=1)
		{
			for (var i = 0; i<kanto.length; i++)
			{
				if(kanto[i].text.toLowerCase() == pokemonID.toLowerCase())
				{
					pokemonFound = 1;
					lastPokemonNum = kanto[i].value;
					lastPokemonName = kanto[i].text;
					break;
				}
			}
		}
		if (pokemonFound !=1)
		{
			for (var i = 0; i<johto.length; i++)
			{
				if(johto[i].text.toLowerCase() == pokemonID.toLowerCase())
				{
					pokemonFound = 1;
					lastPokemonNum = johto[i].value;
					lastPokemonName = johto[i].text;
					break;
				}
			}
		}
		if (pokemonFound !=1)
		{
			for (var i = 0; i<hoenn.length; i++)
			{
				if (hoenn[i].text.toLowerCase() == pokemonID.toLowerCase())
				{
					pokemonFound = 1;
					lastPokemonNum = hoenn[i].value;
					lastPokemonName = hoenn[i].text;
					break;
				}
			}
		}
		if (pokemonFound !=1)
		{
			for (var i= 0; i<sinnoh.length; i++)
			{
				if (sinnoh[i].text.toLowerCase() == pokemonID.toLowerCase())
				{
					pokemonFound = 1;
					lastPokemonNum = sinnoh[i].value;
					lastPokemonName = sinnoh[i].text;
					break;
				}
			}
		}
		if (pokemonFound !=1)
		{
			for (var i=0; i<unova.length; i++)
			{
				if (unova[i].text.toLowerCase() == pokemonID.toLowerCase())
				{
					pokemonFound = 1;
					lastPokemonNum = unova[i].value;
					lastPokemonName = unova[i].text;
					break;
				}
			}
		}
		if (pokemonFound !=1)
		{
			for (var i=0; i<kalos.length; i++)
			{
				if (kalos[i].text.toLowerCase() == pokemonID.toLowerCase())
				{
					pokemonFound = 1;
					lastPokemonNum = kalos[i].value;
					lastPokemonName = kalos[i].text;
					break;
				}
			}
		}
		if (pokemonFound !=1)
		{
			alert("That Pokémon does not Exist!");
		}
		if (pokemonFound == 1)
		{
			DrawUI(lastPokemonNum,lastPokemonName);
		}
	}
	else
	{
		if ((pokemonTemp > 0) && (pokemonTemp <= 721))
		{
			lastPokemonNum = pokemonTemp;
			if(pokemonTemp <=151)
			{
				idName = "dropdown_dex";
			}
			else if (pokemonTemp <=252)
			{
				idName = "dropdown_johto";
			}
			else if (pokemonTemp <=386)
			{
				idName = "dropdown_hoenn";
			}
			else if (pokemonTemp <=493)
			{
				idName = "dropdown_sinnoh";
			}
			else if (pokemonTemp <=649)
			{
				idName = "dropdown_unova";
			}
			else if (pokemonTemp <=721)
			{
				idName = "dropdown_kalos";
			}
			var getName = document.getElementById(idName).getElementsByTagName("option");
			returnName(pokemonTemp);
			
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
	alert("Kalos Pokémon Sprites\nSerebii\nhttp://www.serebii.net/")
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
	changelogText[8] = "v0.9 - Added Quick Find Button for easy Pokémon searching"
	//Changelog End
	
	
	
	var answer = confirm("View all Versions in Changelog?\n(Selecting Cancel will only display the latest version changes");
	alert("Changes since last version");
	if (answer)
	{
		for (var i = 0; i<changelogText.length; i++)
		{
			alert(changelogText[i]);
		}
	}
	else
	{
		
		alert(changelogText[changelogText.length-1]);	
	}
	
}
function bottomUIhandler()
{
	var bottomUI = new Image();
	var bottomContext = canvasBottom.getContext('2d');
	bottomContext.clearRect(0,0,canvasBottom.width,canvasBottom.height);
	bottomUI.onload = function()
	{
		bottomContext.drawImage(bottomUI,0,0);
		buttonPlace(kantoButton)
		buttonPlace(johtoButton);
		buttonPlace(hoennButton);
		buttonPlace(sinnohButton);
		buttonPlace(unovaButton);
		buttonPlace(kalosButton);
		//buttonPlace(otherdataButton);
		//buttonPlace(mpoButton); //MPO Button removed Temporarily until its a finished feature
		buttonPlace(changelogButton);
		buttonPlace(aboutButton);
		buttonPlace(creditsButton);
		buttonPlace(evButton);
		buttonPlace(ivButton);
		buttonPlace(levelButton);
		buttonPlace(natureButton);
		buttonPlace(damagePassButton);
		if (bottomPageNumber == 1)
		{
			buttonPlace(gameSelectButton);
		}
		buttonPlace(searchPokemonButton);
	}
	bottomUI.src = './images/UI/background/bottomUI.png';
	

}
var ctx = canvasBottom.getContext("2d");

//All the Buttons must be Instantiated here
var kantoButton = new Button(7,59,64,24,'./images/UI/buttons/clickButton.png');
var johtoButton = new Button(71,59,64,24,'./images/UI/buttons/Johot.png');
var hoennButton = new Button(135,59,64,24,'./images/UI/buttons/Hoenn.png');
var sinnohButton = new Button(199,59,64,24,'./images/UI/buttons/Sinnoh.png');
var unovaButton = new Button(263,59,64,24,'./images/UI/buttons/Unova.png');
var kalosButton = new Button(327,59,64,24,'./images/UI/buttons/Kalos.png');
var otherdataButton  = new Button(138,89,122,24,'./images/UI/buttons/otherDataButton.png');
var gameSelectButton = new Button(278,89,122,24,'./images/UI/buttons/gameSelectButton.png');
var searchPokemonButton = new Button(0,89,122,24,'./images/UI/buttons/searchPokeButton.png');

//Left Sidebar
var changelogButton = new Button(0,225,128,16,'./images/UI/buttons/changelog.png');
var aboutButton = new Button(0,207,128,16,'./images/UI/buttons/about.png');
var creditsButton = new Button(0,189,128,16,'./images/UI/buttons/credits.png');
var damagePassButton = new Button(0,171,128,16,'./images/UI/buttons/damagePassButton.png');

//Right Sidebar
//var mpoButton = new Button(352,225,49,18,'./images/UI/buttons/mpo_download.png');
var evButton = new Button(352,207,49,18,'./images/UI/buttons/EVbutton.png');
var ivButton = new Button(352,189,49,18,'./images/UI/buttons/IVbutton.png');
var levelButton = new Button(352,171,49,18,'./images/UI/buttons/levelButton.png');
var natureButton = new Button(352,153,49,18,'./images/UI/buttons/natureButton.png');

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
function DrawUI(value,text)
{
	//This function handles everything to do with the User Interface on the Top Screen
	topCanvasCTX = canvasTop.getContext('2d');
	bottomCanvasCTX = canvasBottom.getContext('2d');
	
	var use = value
	var imageObj = new Image();
	var topCanvasUI = new Image();
	var bottomCanvasUI = new Image();
	lastPokemonName = text;
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
				document.getElementById("mpo_download").href = './images/mpo/'+use+'.mpo';
				var nature = document.getElementById("nature_dropdown");
				natureVal = nature.options[nature.selectedIndex].value;
				var natureString = getNature(natureVal);
				ctx_Top.font = "15px Arial";
				
				//8, 40
				enableAllGames();
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
						topCanvasCTX.drawImage(imageObj, 15, 77,96,96);
					};

				}
					ctx_Top.fillStyle = 'black';
					DrawStatWord_Stats(use);
				
				
				
				
			}
			
			topCanvasUI.src = './images/UI/background/TopUI.png';
			imageObj.src = './images/pokemon/'+value+'.png';
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
	var levelPrompt = prompt("Set Pokemon Level 1-100","1");
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
	DrawUI(value,text);
}
function updateTop(value,text)
{
	//This Function is Useful for updating the UI without changing the Pokemon
	if (value !=0)
	{
		DrawUI(value,text);
	}
}

	//Put New 3DS Only code here
	


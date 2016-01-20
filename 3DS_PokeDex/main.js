var mouseX;
var mouseY;
var canvasBottom = document.getElementById("PokeDex_3DS_Bottom");
var canvasTop = document.getElementById("PokeDex_3DS_Top");
var version = "0.6";
var versionNum = 6;
//alert(navigator.appVersion);

window.setInterval(function () {
    window.scrollTo(0, 265);  
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
    mouseX = x;
    mouseY = y;
	checkButtonClick(kantoButton,0);
	checkButtonClick(johtoButton,1);
	checkButtonClick(hoennButton,2);
	checkButtonClick(sinnohButton,3);
	checkButtonClick(unovaButton,4);
	checkButtonClick(kalosButton,5);
	checkButtonClick(mpoButton,6);
	checkButtonClick(changelogButton,7);
	checkButtonClick(aboutButton,8);
	checkButtonClick(creditsButton,9);
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
    mouseY < buttonY + buttonHeight) {
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
			//alert("Not yet Ready");
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
		default:
			alert("Something went wrong =/");
			break;
	}
	
	
}
}
window.showState = function (elementId) {
    var dropdown = document.getElementById(elementId);
    var event;
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);
    dropdown.dispatchEvent(event);
}

function showAbout()
{
	alert("Web Pokédex Version "+version+"\nJanuary 2016 - Present\nDeveloped by Shubshub\nWe are not affiliated with Nintendo or The Pokemon Company\nAll Pokemon Images and 3D Models are Copyrighted images owned by The Pokemon Company");
}
function showCredits()
{
	alert("Web Pokédex Credits");
	alert("Programming\nShubshub");
	alert("Bug Testing\\UI Design\nElyosOfTheAbyss");
	alert("Kalos Pokemon Sprites\nSerebii\nhttp://www.serebii.net/")
}


function showChangelog()
{
	var changelogText = new Array(versionNum);
	
	
	//Changelog Array
	changelogText[0] = "v0.1 - Initial Version, Some pokemon images are displayed, All 5 Region buttons added";
	changelogText[1] = "v0.2 - Some MPO Images have been Added and Displayed in 3D";
	changelogText[2] = "v0.3 - Stats are now displayed on Top Screen";
	changelogText[3] = "v0.4 - All Base Stats have been Added and Display Correctly\nThanks to pokeapi.co for the JSON Data";
	changelogText[4] = "v0.5 - Minor Stability Update: Changed Image Links to short form for when Website changes Location things don't break\nAdded all Unova Region Pokemon\nStable enough to stand on without falling off while Sober";
	changelogText[5] = "v0.6 - All Kalos Pokemon added except Hoopa, Diancie and Volcanion\nAwesome Looking User Interface Courtesy of ElyosOfTheAbyss\nOther Minor Bug Fixes\nStable enough to balance a fork on now\nWe Apologize for the Slow Loading Times not much we can do";
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
	bottomUI.onload = function()
	{
		bottomContext.drawImage(bottomUI,0,0);
		buttonPlace(kantoButton)
		buttonPlace(johtoButton);
		buttonPlace(hoennButton);
		buttonPlace(sinnohButton);
		buttonPlace(unovaButton);
		buttonPlace(kalosButton);
		buttonPlace(mpoButton);
		buttonPlace(changelogButton);
		buttonPlace(aboutButton);
		buttonPlace(creditsButton);
	}
	bottomUI.src = './images/bottomUI.png';
	

}
var ctx = canvasBottom.getContext("2d");

//All the Buttons must be Instantiated here
var kantoButton = new Button(7,59,64,24,'./images/clickButton.png');
var johtoButton = new Button(71,59,64,24,'./images/Johot.png');
var hoennButton = new Button(135,59,64,24,'./images/Hoenn.png');
var sinnohButton = new Button(199,59,64,24,'./images/Sinnoh.png');
var unovaButton = new Button(263,59,64,24,'./images/Unova.png');
var kalosButton = new Button(327,59,64,24,'./images/Kalos.png');
var mpoButton = new Button(352,225,48,16,'./images/mpo_download.png');
var changelogButton = new Button(0,225,128,16,'./images/changelog.png');
var aboutButton = new Button(0,207,128,16,'./images/about.png');
var creditsButton = new Button(0,189,128,16,'./images/credits.png');

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
function DrawUI(value)
{
	//This function handles everything to do with the User Interface on the Top Screen
	topCanvasCTX = canvasTop.getContext('2d');
	bottomCanvasCTX = canvasBottom.getContext('2d');
	
	var use = value
	var imageObj = new Image();
	var topCanvasUI = new Image();
	var bottomCanvasUI = new Image();
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
		
		imageObj.onload = function() 
		{
			topCanvasCTX.drawImage(imageObj, 15, 77,96,96);
		};
		ctx_Top.fillStyle = 'black';
		DrawStatWord_Stats(use);
		
	}
	
	topCanvasUI.src = './images/TopUI.png'
	imageObj.src = './images/pokemon/'+value+'.png';
}
function updatePokemon(elementId)
{
	var e = document.getElementById(elementId);
	var value = e.options[e.selectedIndex].value;
	var text = e.options[e.selectedIndex].text;
	
	DrawUI(value);
}


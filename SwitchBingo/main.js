var image_order = [
	"zelda_exclusive",
	"nintendo_eshop",
	"mario_kart",
	"miiverse",
	"achievements",
	"multi_touch_screen",
	"smash_bros",
	"new_ip",
	"battery_life",
	"subscription_service",
	"joycon_pointer",
	"mario_game_3d",
	"ram_amount",
	"no_region_lock",
	"analog_triggers",
	"launch_price",
	"usb_c_charging",
	"joycon_sold_seperately",
	"share_button",
	"mobile_game_emulator",
	"no_discs",
	"ar_compatibility",
	"virtual_console",
	"backwards_compatible_digital"
]

var empty_image_order = [
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty",
	"empty"
]

var startingLeft = 6;
var horizontalVerticalSpacing = 6;
var endingRight = 5;
var panelsPlaced = 0;

var globalX = 6;
var globalY = 89;
var imageArray = [];
var EmptyimageArray = [];
var activeImageArray = [];
var EmptyactiveImageArray = [];
var baseLayer;

var xLocation = [];
var yLocation = [];

var imageType = [];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

image_order = shuffle(image_order);


function init()
{
	baseLayer = document.createElement("img");
	baseLayer.src = "layout.png";
	for (var i = 0; i < image_order.length; i++)
	{
		imageArray[i] = document.createElement("img");
		imageArray[i].src = "panels/" + image_order[i] + ".png";
		
		activeImageArray[i] = document.createElement("img");
		activeImageArray[i].src = "active/" + image_order[i] + ".png";
		
		
		EmptyimageArray[i] = document.createElement("img");
		EmptyimageArray[i].src = "panels/" + empty_image_order[i] + ".png";
		
		EmptyactiveImageArray[i] = document.createElement("img");
		EmptyactiveImageArray[i].src = "active/" + empty_image_order[i] + ".png";
	}
}

init();

function clickHandler(event)
{
	var canvas = document.getElementById("bingoPanel");
	var context = canvas.getContext("2d");
	
	for (var i = 0; i < image_order.length; i++)
	{
		if (event.clientX > xLocation[i] && event.clientX < xLocation[i] + imageArray[i].width)
		{
			if (event.clientY > yLocation[i] && event.clientY < yLocation[i] + imageArray[i].height)
			{
				if(imageType[i] == 0)
				{
					context.drawImage(activeImageArray[i], xLocation[i], yLocation[i]);
					imageType[i] = 1;
				}
				else if (imageType[i] == 1)
				{
					context.drawImage(imageArray[i], xLocation[i], yLocation[i]);
					imageType[i] = 0;
				}
			}
		}
		
		
	}
}

function EmptyclickHandler(event)
{
	var canvas = document.getElementById("bingoPanel");
	var context = canvas.getContext("2d");
	
	for (var i = 0; i < image_order.length; i++)
	{
		if (event.clientX > xLocation[i] && event.clientX < xLocation[i] + EmptyimageArray[i].width)
		{
			if (event.clientY > yLocation[i] && event.clientY < yLocation[i] + EmptyimageArray[i].height)
			{
				if(imageType[i] == 0)
				{
					context.drawImage(EmptyactiveImageArray[i], xLocation[i], yLocation[i]);
					imageType[i] = 1;
				}
				else if (imageType[i] == 1)
				{
					context.drawImage(EmptyimageArray[i], xLocation[i], yLocation[i]);
					imageType[i] = 0;
				}
			}
		}
		
		
	}
}

function placeAllPanels()
{
	var canvas = document.getElementById("bingoPanel");
	canvas.addEventListener("click", function(event)
	{
		clickHandler(event);
	});
	var context = canvas.getContext("2d");
	
	$(canvas).ready(function(){
		context.drawImage(baseLayer, 0, 0);
		
		for (var i = 0; i < image_order.length; i++)
		{
			

			context.drawImage(imageArray[i], globalX, globalY);
			xLocation[i] = globalX;
			yLocation[i] = globalY;
			imageType[i] = 0;
			panelsPlaced+=1;
			y = i+1;
			if (panelsPlaced == 24)
			{
				y = i;
			}
			
			if (panelsPlaced == 5 || panelsPlaced == 10 || panelsPlaced == 14 || panelsPlaced == 19)
			{
				//Change to new Row
				globalX = 6;
				globalY += imageArray[y].height + 6;
			}
			else if (panelsPlaced == 12)
			{
				globalX += (imageArray[y].width +6 ) + 153 + 6; //Skip the Freespace
			}
			else
			{
				globalX += imageArray[y].width + 6;
			}
		}
		
		console.log("Done");
	});
	
	
	
	
}


function placeAllEmptyPanels()
{
	var canvas = document.getElementById("bingoPanel");
	canvas.addEventListener("click", function(event)
	{
		EmptyclickHandler(event);
	});
	var context = canvas.getContext("2d");
	
	$(canvas).ready(function(){
		context.drawImage(baseLayer, 0, 0);
		
		for (var i = 0; i < empty_image_order.length; i++)
		{
			

			context.drawImage(EmptyimageArray[i], globalX, globalY);
			xLocation[i] = globalX;
			yLocation[i] = globalY;
			imageType[i] = 0;
			panelsPlaced+=1;
			y = i+1;
			if (panelsPlaced == 24)
			{
				y = i;
			}
			
			if (panelsPlaced == 5 || panelsPlaced == 10 || panelsPlaced == 14 || panelsPlaced == 19)
			{
				//Change to new Row
				globalX = 6;
				globalY += imageArray[y].height + 6;
			}
			else if (panelsPlaced == 12)
			{
				globalX += (imageArray[y].width +6 ) + 153 + 6; //Skip the Freespace
			}
			else
			{
				globalX += imageArray[y].width + 6;
			}
		}
		
		console.log("Done");
	});
	
	
	
	
}
//Class Structure for the Pokemon Stats
//Nintendo 3DS Browser doesn't support Classes
var statsArray = new Array(6);
function getStats(pokedex) 
{
 $.getJSON("./jsonData/"+pokedex+".json", function(json)
 {
	statsArray[0] = json.hp;
	statsArray[1] = json.attack;
	statsArray[2] = json.defense;
	statsArray[3] = json.sp_atk;
	statsArray[4] = json.sp_def;
	statsArray[5] = json.speed;
	dataReady()
 });
 
}
function dataReady()
{
	//ctx_Top.clearRect(0,0,canvasTop.width,canvasTop.height);
	
	ctx_Top.font = "15px Arial";
	ctx_Top.fillStyle = "white";
	ctx_Top.fillText(statsArray[0],230,122); //Health
	ctx_Top.fillText(statsArray[1],230,137); //Attack
	ctx_Top.fillText(statsArray[2],230,154); //Defense
	ctx_Top.fillText(statsArray[3],230,170); //Sp. Atk
	ctx_Top.fillText(statsArray[4],230,186); //Sp. Def
	ctx_Top.fillText(statsArray[5],230,203); //Speed
	ctx_Top.stroke();
	ctx_Top.stroke();
	ctx_Top.fillStyle = "black";
}
function BaseToActual_HP(BaseHP, IV, EV, level)
{
	var actual = (((2 * BaseHP + IV + (EV / 4)) * level) / 100) + level + 10;
	return actual;
}

//Calculate Actual Stat based on Base Stat, IV, EV, Level and Nature Modifier
function BaseToActual(Base, IV, EV, Level, NatureMod)
{
	var actual = ((((2 * Base + IV + (EV / 4)) * Level) / 100) + 5) * NatureMod;
	return actual;
}
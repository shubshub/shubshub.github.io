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
	ctx_Top.clearRect(0,0,canvasTop.width,canvasTop.height);
	ctx_Top.font = "30px Arial";
	ctx_Top.fillText("3DS - Web Pokedex v"+version,10,30);
	ctx_Top.font = "15px Arial";
	ctx_Top.fillText("Base Stats",129,60);
	ctx_Top.fillText("Health: "+statsArray[0],129,80);
	ctx_Top.fillText("Attack: "+statsArray[1],129,100);
	ctx_Top.fillText("Defense: "+statsArray[2],129,120);
	ctx_Top.fillText("Sp. Attack: "+statsArray[3],129,140);
	ctx_Top.fillText("Sp. Defense: "+statsArray[4],129,160);
	ctx_Top.fillText("Speed: "+statsArray[5],129,180);
	ctx_Top.stroke();
	ctx_Top.stroke();
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
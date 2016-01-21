//Class Structure for the Pokemon Stats
//Nintendo 3DS Browser doesn't support Classes
var statsArray = new Array(6);
var ivArray = new Array(0,0,0,0,0,0);
var evArray = new Array(0,0,0,0,0,0);
var natureMod = new Array(5);
var healthIV = 0;
var attackIV = 0;
var defenseIV = 0;
var specialAtkIV = 0;
var specialDefIV = 0;
var speedIV = 0;
var healthEV = 0;
var attackEV = 0;
var defenseEV = 0;
var specialAtkEV = 0;
var specialDefEV = 0;
var speedEV = 0;
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
	drawStats()
 });
 
}
function updateIVs()
{
	var f = document.getElementById("iv_dropdown");
	var val = f.options[f.selectedIndex].value;
	var val = parseInt(val);
	healthIV = ivArray[0];
	attackIV = ivArray[1];
	defenseIV = ivArray[2];
	specialAtkIV = ivArray[3];
	specialDefIV = ivArray[4];
	speedIV = ivArray[5];
	switch(val)
	{
		case 0:
			var hpIV = prompt("Set Health IV 0-31");
			if ((hpIV !=null) && !(isNaN(hpIV)))
			{
				hpIV = parseInt(hpIV);
				if ((hpIV >=0) && (hpIV <=31))
				{
					healthIV = hpIV;
				}
				else
				{
					alert("Must be between 0 and 31");
					updateIVs();
				}
				break;
			}
			break;
		case 1:
			var atkIV = prompt("Set Attack IV 0-31");
			if ((atkIV !=null) && !(isNaN(atkIV)))
			{
				atkIV = parseInt(atkIV);
				if ((atkIV >=0) && (atkIV <=31))
				{
					attackIV = atkIV;
				}
				else
				{
					alert("Must be between 0 and 31");
					updateIVs();
				}
				break;
			}
			break;
		case 2:
			var defIV = prompt("Set Defense IV 0-31");
			if ((defIV !=null) && !(isNaN(defIV)))
			{
				defIV = parseInt(defIV);
				if ((defIV >=0) && (defIV <=31))
				{
					defenseIV = defIV;
				}
				else
				{
					alert("Must be between 0 and 31");
					updateIVs();
				}
				break;
			}
			break;
		case 3:
			var spAIV = prompt("Set Special Attack IV 0-31");
			if ((spAIV !=null) && !(isNaN(spAIV)))
			{
				spAIV = parseInt(spAIV);
				if ((spAIV >=0) && (spAIV <=31))
				{
					specialAtkIV = spAIV;
				}
				else
				{
					alert("Must be between 0 and 31");
					updateIVs();
				}
				break;
			}
			break;
		case 4:
			var spDIV = prompt("Set Special Defense IV 0-31");
			if ((spDIV !=null) && !(isNaN(spDIV)))
			{
				spDIV = parseInt(spDIV);
				if ((spDIV >=0) && (spDIV <=31))
				{
					specialDefIV = spDIV;
				}
				else
				{
					alert("Must be between 0 and 31");
					updateIVs();
				}
				break;
			}
			break;
		case 5:
			var spdIV = prompt("Set Speed IV 0-31");
			if ((spdIV !=null) && !(isNaN(spdIV)))
			{
				spdIV = parseInt(spdIV);
				if ((spdIV >=0) && (spdIV <=31))
				{
					speedIV = spdIV;
				}
				else
				{
					alert("Must be between 0 and 31");
					updateIVs();
					break;
				}
				break;
			}
			break;
		case 54:
			break;
		default:
			alert("Something went wrong?");
			break;
			
	}
	ivArray[0] = healthIV;
	ivArray[1] = attackIV;
	ivArray[2] = defenseIV;
	ivArray[3] = specialAtkIV;
	ivArray[4] = specialDefIV;
	ivArray[5] = speedIV;
	f.selectedIndex = 0;
	updateTop(lastPokemonNum);
}

function updateEVs()
{
	var f = document.getElementById("ev_dropdown");
	var val = f.options[f.selectedIndex].value;
	var val = parseInt(val);
	healthEV= evArray[0];
	attackEV = evArray[1];
	defenseEV = evArray[2];
	specialAtkEV = evArray[3];
	specialDefEV = evArray[4];
	speedEV = evArray[5];
	switch(val)
	{
		case 0:
			var hpEV = prompt("Set Health EV 0-252");
			if ((hpEV !=null) && !(isNaN(hpEV)))
			{
				hpEV = parseInt(hpEV);
				if ((hpEV >=0) && (hpEV <=252))
				{
					healthEV = hpEV;
				}
				else
				{
					alert("Must be between 0 and 252");
					updateEVs();
				}
				break;
			}
			break;
		case 1:
			var atkEV = prompt("Set Attack EV 0-252");
			if ((atkEV !=null) && !(isNaN(atkEV)))
			{
				atkEV = parseInt(atkEV);
				if ((atkEV >=0) && (atkEV <=252))
				{
					attackEV = atkEV;
				}
				else
				{
					alert("Must be between 0 and 252");
					updateEVs();
				}
				break;
			}
			break;
		case 2:
			var defEV = prompt("Set Defense EV 0-252");
			if ((defEV !=null) && !(isNaN(defEV)))
			{
				defEV = parseInt(defEV);
				if ((defEV >=0) && (defEV <=252))
				{
					defenseEV = defEV;
				}
				else
				{
					alert("Must be between 0 and 252");
					updateEVs();
				}
				break;
			}
			break;
		case 3:
			var spAEV = prompt("Set Special Attack EV 0-252");
			if ((spAEV !=null) && !(isNaN(spAEV)))
			{
				spAEV = parseInt(spAEV);
				if ((spAEV >=0) && (spAEV <=252))
				{
					specialAtkEV = spAEV;
				}
				else
				{
					alert("Must be between 0 and 252");
					updateEVs();
				}
				break;
			}
			break;
		case 4:
			var spDEV = prompt("Set Special Defense EV 0-252");
			if ((spDEV !=null) && !(isNaN(spDEV)))
			{
				spDEV = parseInt(spDEV);
				if ((spDEV >=0) && (spDEV <=252))
				{
					specialDefEV = spDEV;
				}
				else
				{
					alert("Must be between 0 and 252");
					updateEVs();
				}
				break;
			}
			break;
		case 5:
			var spdEV = prompt("Set Speed EV 0-252");
			if ((spdEV !=null) && !(isNaN(spdEV)))
			{
				spdEV = parseInt(spdEV);
				if ((spdEV >=0) && (spdEV <=252))
				{
					speedEV = spdEV;
				}
				else
				{
					alert("Must be between 0 and 252");
					updateEVs();
				}
				break;
			}
			break;
		case 54:
			break;
		default:
			alert("Something went wrong?");
			break;
			
	}
	evArray[0] = healthEV;
	evArray[1] = attackEV;
	evArray[2] = defenseEV;
	evArray[3] = specialAtkEV;
	evArray[4] = specialDefEV;
	evArray[5] = speedEV;
	f.selectedIndex = 0;
	updateTop(lastPokemonNum);
}


function drawStats()
{	
	//This function is called to draw all Stats
	ctx_Top.font = "15px Arial";
	ctx_Top.fillStyle = "white";
	ctx_Top.fillText(statsArray[0],230,122); //Health
	ctx_Top.fillText(statsArray[1],230,137); //Attack
	ctx_Top.fillText(statsArray[2],230,154); //Defense
	ctx_Top.fillText(statsArray[3],230,170); //Sp. Atk
	ctx_Top.fillText(statsArray[4],230,186); //Sp. Def
	ctx_Top.fillText(statsArray[5],230,203); //Speed
	drawActualStats(levelGlobal,natureVal);
	drawIV();
	drawEV();
	ctx_Top.stroke();
	ctx_Top.stroke();
	ctx_Top.fillStyle = "black";
}

function drawActualStats(levelNum,natureModifier)
{
	var healthBase = statsArray[0];
	var attackBase = statsArray[1];
	var defenseBase = statsArray[2];
	var spAttackBase = statsArray[3];
	var spDefenseBase = statsArray[4];
	var speedBase = statsArray[5];
	var healthIV = ivArray[0];
	var attackIV = ivArray[1];
	var defenseIV = ivArray[2];
	var spAttackIV = ivArray[3];
	var spDefenseIV = ivArray[4];
	var speedIV = ivArray[5];
	var healthEV = evArray[0];
	var attackEV = evArray[1];
	var defenseEV = evArray[2];
	var spAttackEV = evArray[3];
	var spDefenseEV = evArray[4];
	var speedEV = evArray[5];
	getNatureModifier(natureModifier);
	var actualHealth = BaseToActual_HP(healthBase, healthIV, healthEV, levelNum);
	var actualAttack = BaseToActual(attackBase, attackIV, attackEV, levelNum, natureMod[0]);
	var actualDefense = BaseToActual(defenseBase, defenseIV, defenseEV, levelNum, natureMod[1]);
	var actualSpAttack = BaseToActual(spAttackBase,spAttackIV,spAttackEV,levelNum, natureMod[2]);
	var actualSpDefense = BaseToActual(spDefenseBase, spDefenseIV,spDefenseEV,levelNum, natureMod[3]);
	var actualSpeed = BaseToActual(speedBase,speedIV,speedEV,levelNum,natureMod[4]);
	ctx_Top.fillText(actualHealth,345,122);
	ctx_Top.fillText(actualAttack,345,137);
	ctx_Top.fillText(actualDefense,345,154);
	ctx_Top.fillText(actualSpAttack,345,170);
	ctx_Top.fillText(actualSpDefense,345,186);
	ctx_Top.fillText(actualSpeed,345,203);
}

function getNatureModifier(natureModifier)
{
	/*
	natureMod[0 - 4]
	0: Attack
	1: Defense
	2: Special Attack
	3: Special Defense
	4: Speed
	+10% = 1.1
	-10% = 0.9
	*/
	natureMod[0] = 1; //Attack
	natureMod[1] = 1; //Defense
	natureMod[2] = 1; //Special Attack
	natureMod[3] = 1; //Special Defense
	natureMod[4] = 1; //Speed
	natureModifier = parseInt(natureModifier);
	switch(natureModifier)
	{
		case 0:
			//Doesn't change any stats
			break;
		case 1:
			//Lonely +Attack -Defense
			natureMod[0] = 1.1;
			natureMod[1] = 0.9;
			break;
		case 2:
			//Brave +Attack -Speed
			natureMod[0] = 1.1;
			natureMod[4] = 0.9;
			break;
		case 3:
			//Adamant +Attack -Sp. Attack
			natureMod[0] = 1.1;
			natureMod[2] = 0.9;
			break;
		case 4:
			//Naughty +Attack -Sp. Defense
			natureMod[0] = 1.1;
			natureMod[3] = 0.9;
			break;
		case 5:
			//Bold +Defense -Attack
			natureMod[0] = 0.9;
			natureMod[1] = 1.1;
			break;
		case 6:
			//Docile changes Nothing
			break;
		case 7:
			//Relaxed +Defense -Speed
			natureMod[1] = 1.1;
			natureMod[4] = 0.9;
			break;
		case 8:
			//Impish +Defense -Sp. Attack
			natureMod[1] = 1.1;
			natureMod[2] = 0.9;
			break;
		case 9:
			//Lax +Defense -Sp. Defense
			natureMod[1] = 1.1;
			natureMod[3] = 0.9;
			break;
		case 10:
			//Timid +Speed -Attack
			natureMod[0] = 0.9;
			natureMod[4] = 1.1;
			break;
		case 11:
			//Hasty +Speed -Defense
			natureMod[1] = 0.9;
			natureMod[4] = 1.1;
			break;
		case 12:
			//Serious changes nothing
			break;
		case 13:
			//Jolly +Speed -Sp. Attack
			natureMod[2] = 0.9;
			natureMod[4] = 1.1;
			break;
		case 14:
			//Naive +Speed -Sp. Defense
			natureMod[3] = 0.9;
			natureMod[4] = 1.1;
			break;
		case 15:
			//Modest +Sp. Attack -Attack
			natureMod[0] = 0.9;
			natureMod[2] = 1.1;
			break;
		case 16:
			//Mild +Sp. Attack -Defense
			natureMod[1] = 0.9;
			natureMod[2] = 1.1;
			break;
		case 17:
			//Quiet +Sp. Attack -Speed
			natureMod[2] = 1.1;
			natureMod[4] = 0.9;
			break;
		case 18:
			//Bashful changes nothing
			break;
		case 19:
			//Rash +Sp. Attack -Sp. Defense
			natureMod[2] = 1.1;
			natureMod[3] = 0.9;
			break;
		case 20:
			//Calm +Sp. Defense -Attack
			natureMod[0] = 0.9;
			natureMod[3] = 1.1;
			break;
		case 21:
			//Gentle +Sp. Defense -Defense
			natureMod[1] = 0.9;
			natureMod[3] = 1.1;
			break;
		case 22:
			//Sassy +Sp. Defense -Speed
			natureMod[3] = 1.1;
			natureMod[4] = 0.9;
			break;
		case 23:
			//Careful +Sp. Defense -Sp. Attack
			natureMod[2] = 0.9;
			natureMod[3] = 1.1;
			break;
		case 24:
			//Quirky changes nothing
			break;
		default:
			alert("Something went wrong");
			break;
	}
	
}


function drawIV()
{
	ctx_Top.font = "15px Arial";
	ctx_Top.fillStyle = "white";
	ctx_Top.fillText(ivArray[0],275,122); //Health
	ctx_Top.fillText(ivArray[1],275,137); //Attack
	ctx_Top.fillText(ivArray[2],275,154); //Defense
	ctx_Top.fillText(ivArray[3],275,170); //Sp. Atk
	ctx_Top.fillText(ivArray[4],275,186); //Sp. Def
	ctx_Top.fillText(ivArray[5],275,203); //Speed
	ctx_Top.fillStyle = "black";
}

function drawEV()
{
	ctx_Top.font = "15px Arial";
	ctx_Top.fillStyle = "white";
	ctx_Top.fillText(evArray[0],310,122); //Health
	ctx_Top.fillText(evArray[1],310,137); //Attack
	ctx_Top.fillText(evArray[2],310,154); //Defense
	ctx_Top.fillText(evArray[3],310,170); //Sp. Atk
	ctx_Top.fillText(evArray[4],310,186); //Sp. Def
	ctx_Top.fillText(evArray[5],310,203); //Speed
	ctx_Top.fillStyle = "black";
}

function BaseToActual_HP(BaseHP, IV, EV, level)
{
	var actual = (((2 * BaseHP + IV + (EV / 4)) * level) / 100) + level + 10;
	return Math.floor(actual);
}

//Calculate Actual Stat based on Base Stat, IV, EV, Level and Nature Modifier
function BaseToActual(Base, IV, EV, Level, NatureMod)
{
	var actual = ((((2 * Base + IV + (EV / 4)) * Level) / 100) + 5) * NatureMod;
	return Math.floor(actual);
}
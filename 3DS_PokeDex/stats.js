//Class Structure for the Pokemon Stats
"use strict"
class StatFile {
	
	constructor(level, health, attack, defense, spAttack, spDefense, speed, ivHealth, ivAttack, ivDefense, ivSpAttack, ivSpDefense, ivSpeed)
	{
		//Base Stats
		this.level = level;
		this.health = health;
		this.attack = attack;
		this.defense = defense;
		this.spAttack = spAttack;
		this.spDefense = spDefense;
		this.speed = speed;
		
		//Indiviual Values
		this.ivHealth = ivHealth;
		this.ivAttack = ivAttack;
		this.ivDefense = ivDefense;
		this.ivSpAttack = ivSpAttack;
		this.ivSpDefense = ivSpDefense;
		this.ivSpeed = ivSpeed;
	}
}

var Pokedex = new Array(721); //An array of Length 721
for (var i = 0; i<=721; i++)
{
	Pokedex[i] = new StatFile(0,0,0,0,0,0,0,0,0,0,0,0);
}

function initStats()
{
	Pokedex[1].level = 1; 
	Pokedex[1].health = 45; 
	Pokedex[1].attack = 49; 
	Pokedex[1].defense = 49; 
	Pokedex[1].spAttack = 65; 
	Pokedex[1].spDefense = 65; 
	Pokedex[1].speed = 45;
	Pokedex[1].ivHealth = 31;
	Pokedex[1].ivAttack = 31;
	Pokedex[1].ivDefense = 31;
	Pokedex[1].ivSpAttack = 31;
	Pokedex[1].ivSpDefense = 31;
	Pokedex[1].ivSpeed = 31;
}
//Calculate Actual Stat for HP based on BaseHP, IV, EV and Level
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
initStats();
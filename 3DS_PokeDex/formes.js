Object.defineProperty(Object.prototype, "push",
{
	value: function (key, data)
	{
		this[key] = data;
	},
	enumerable: false
});

var formeList = {};


formeList.push(3, ["", "mega"]); //Venusaur
formeList.push(6, ["", "mega-x", "mega-y"]); //Charizard
formeList.push(9, ["", "mega"]); //Blastoise
formeList.push(15, ["", "mega"]); //Beedrill
formeList.push(18, ["", "mega"]); //Pidgeot
formeList.push(19, ["", "alola"]); //Rattata
formeList.push(20, ["", "alola"]); //Raticate
formeList.push(26, ["", "alola"]); //Raichu
formeList.push(27, ["", "alola"]); //Sandshrew
formeList.push(28, ["", "alola"]); //Sandslash
formeList.push(37, ["", "alola"]); //Vulpix
formeList.push(38, ["", "alola"]); //Ninetales
formeList.push(50, ["", "alola"]); //Diglett
formeList.push(51, ["", "alola"]); //Dugtrio
formeList.push(52, ["", "alola"]); //Meowth
formeList.push(53, ["", "alola"]); //Persian
formeList.push(65, ["", "mega"]); //Alakazam
formeList.push(74, ["", "alola"]); //Geodude
formeList.push(75, ["", "alola"]); //Graveler
formeList.push(76, ["", "alola"]); //Golem
formeList.push(80, ["", "mega"]); //Slowbro
formeList.push(88, ["", "alola"]); //Grimer
formeList.push(89, ["", "alola"]); //Muk
formeList.push(94, ["", "mega"]); //Gengar
formeList.push(103, ["", "alola"]); //Exeggutor
formeList.push(105, ["", "alola"]); //Marowak
formeList.push(115, ["", "mega"]); //Kangaskhan
formeList.push(127, ["", "mega"]); //Pinsir
formeList.push(130, ["", "mega"]); //Gyarados
formeList.push(142, ["", "mega"]); //Aerodactyl
formeList.push(150, ["", "mega-x", "mega-y"]); //Mewtwo
formeList.push(181, ["", "mega"]); //Ampharos
formeList.push(201, ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "?", "!"]); //Unown
formeList.push(208, ["", "mega"]); //Steelix
formeList.push(212, ["", "mega"]); //Scizor
formeList.push(214, ["", "mega"]); //Heracross
formeList.push(229, ["", "mega"]); //Houndoom
formeList.push(248, ["", "mega"]); //Tyranitar
formeList.push(254, ["", "mega"]); //Sceptile
formeList.push(257, ["", "mega"]); //Blaziken
formeList.push(260, ["", "mega"]); //Swampert
formeList.push(282, ["", "mega"]); //Gardevoir
formeList.push(302, ["", "mega"]); //Sableye
formeList.push(303, ["", "mega"]); //Mawile
formeList.push(306, ["", "mega"]); //Aggron
formeList.push(308, ["", "mega"]); //Medicham
formeList.push(310, ["", "mega"]); //Manectric
formeList.push(319, ["", "mega"]); //Sharpedo
formeList.push(323, ["", "mega"]); //Camerupt
formeList.push(334, ["", "mega"]); //Altaria
formeList.push(351, ["", "sunny", "rainy", "snowy"]); //Castform
formeList.push(354, ["", "mega"]); //Banette
formeList.push(359, ["", "mega"]); //Absol
formeList.push(362, ["", "mega"]); //Glalie
formeList.push(373, ["", "mega"]); //Salamence
formeList.push(376, ["", "mega"]); //Metagross
formeList.push(380, ["", "mega"]); //Latias
formeList.push(381, ["", "mega"]); //Latios
formeList.push(382, ["", "primal"]); //Kyogre
formeList.push(383, ["", "primal"]); //Groudon
formeList.push(384, ["", "mega"]); //Rayquaza
formeList.push(386, ["normal", "attack", "defense", "speed"]); //Deoxys
formeList.push(412, ["plant", "sand", "trash"]); //Burmy
formeList.push(413, ["plant", "sand", "trash"]); //Wormadam
formeList.push(421, ["overcast", "sunshine"]); //Cherrim
formeList.push(422, ["west", "east"]); //Shellos
formeList.push(423, ["west", "east"]); //Gastrodon
formeList.push(428, ["", "mega"]); //Lopunny
formeList.push(445, ["", "mega"]); //Garchomp
formeList.push(448, ["", "mega"]); //Lucario
formeList.push(460, ["", "mega"]); //Abomasnow
formeList.push(475, ["", "mega"]); //Gallade
formeList.push(479, ["", "mow", "frost", "heat", "fan", "wash"]); //Rotom
formeList.push(487, ["", "origin"]); //Giratina
formeList.push(492, ["", "sky"]); //Shaymin
formeList.push(493, ["", "bug", "dark", "dragon", "electric", "fairy", "fight", "fire", "flying", "ghost", "grass", "ground", "ice", "poison", "psychic", "rock", "steel", "water"]); //Arceus
formeList.push(531, ["", "mega"]); //Audino
formeList.push(550, ["red", "blue"]); //Basculin
formeList.push(555, ["", "zen"]); //Darmanitan
formeList.push(585, ["spring", "summer", "autumn", "winter"]); //Deerling
formeList.push(586, ["spring", "summer", "autumn", "winter"]); //Sawsbuck
formeList.push(641, ["", "therian"]); //Tornadus
formeList.push(642, ["", "therian"]); //Thundurus
formeList.push(645, ["", "therian"]); //Landorus
formeList.push(646, ["", "black", "white"]); //Kyurem
formeList.push(647, ["", "resolute"]); //Keldeo
formeList.push(648, ["", "pirouette"]); //Meloetta
formeList.push(658, ["", "ash"]); //Greninja
formeList.push(666, ["meadow", "polar", "tundra", "continental", "garden", "elegant", "icy-snow", "modern", "marine", "archipelago", "high-plains", "sandstorm", "river", "monsoon", "savanna", "sun", "ocean", "jungle"]); //Vivillon
formeList.push(669, ["red", "blue", "orange", "white", "yellow"]); //Flabebe
formeList.push(670, ["red", "blue", "orange", "white", "yellow"]); //Floette
formeList.push(671, ["red", "blue", "orange", "white", "yellow"]); //Florges
formeList.push(676, ["", "heart", "star", "diamond", "deputante", "matron", "dandy", "la-reine", "kabuki", "pharaoh"]); //Furfrou
formeList.push(681, ["shield", "blade"]); //Aegislash
formeList.push(710, ["small", "average", "large", "super"]); //Pumpkaboo
formeList.push(711, ["small", "average", "large", "super"]); //Gourgeist
formeList.push(718, ["10%", "50%", "complete"]); //Zygarde
formeList.push(719, ["", "mega"]); //Diancie
formeList.push(720, ["", "unbound"]); //Hoopa
formeList.push(741, ["pom-pom","baile", "pau", "sensu"]); //Oricorio
formeList.push(745, ["midday", "midnight"]); //Lycanroc
formeList.push(746, ["solo", "school"]); //Wishiwashi
formeList.push(773, ["", "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice","poison", "psychic", "rock", "steel", "water"]); //Silvally
formeList.push(774, ["core", "meteor"]); //Minior


function countForme(pokedex)
{
	var _dex = parseInt(pokedex);
	if(formeList.hasOwnProperty(_dex))
	{
		return formeList[_dex].length;
	}
}



/*Object.prototype.push = function(key, data) {
	this[key] = data;
}*/

/*Object.prototype.forme = function(key, data) {
	var list = ["", "mega", "alola", "mega-x", "mega-y"]
}*/


//Modify this to be an object
function getForme(pokedex, forme)
{
	var _dex = 0;
	if (pokedex == undefined)
	{
		return "";
	}
	if (isNaN(parseInt(pokedex)))
	{
		_dex = getDexNumber(pokedex);
	}
	else
	{
		_dex = parseInt(pokedex);
	}
	if (_dex != 0)
	{
		
		if (formeList.hasOwnProperty(_dex))
		{
			return formeList[_dex][forme];
		}
		else
		{
			return "";
		}
		
	}
	else
	{
		return "";
	}
}
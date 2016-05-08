function interpret()
{
	var a = document.getElementById("input");
	var b = document.getElementById("output");
	lang(a,b);
}
function converter()
{
	var a = document.getElementById("input");
	var b = document.getElementById("output");
	convert(a,b);
}
function getCloser(a, b, c) {
    b = b || c;
    return Math.round(a / b) * b;
}

function golphisEven(n) {
  n = Number(n);
  return n === 0 || !!(n && !(n%2));
}

function convert(txt,chan)
{
	txt = txt.value;
	var tex = "";
	tex = txt;
	t=""
	j = 0;
	for (var i = 0;i<tex.length;i++)
	{
		while(j!=tex.charCodeAt(i))
		{
			if ((j * 2) < tex.charCodeAt(i))
			{
				if ((j * 2) == Math.round(j * 2))
				{
					t+="'";
					j = j * 2;	
				}
			}
			if ((j / 2) > tex.charCodeAt(i))
			{
				if ((j / 2) == Math.round(j / 2))
				{
					t+=".";
					j = j / 2;	
				}
			}
			var plusArray = [];
			var plus = "";
			if (j < tex.charCodeAt(i))
			{

				var count = 0;
				for (var z = j+1; z < tex.charCodeAt(i);z++)
				{
					count++;
				}
				if(golphisEven(count))
				{
					var temp = 0;
					var smallestDiv = 99;
					for (var l = 2; l < 15; l++)
					{
						if ((count / l) == (Math.round(count / l)))
						{
							if ((count / l) > 3)
							{
								var div = count / l;
								var len = l;
								if ((div + l) < smallestDiv)
								{
									smallestDiv = div + l;
									temp = (count) / l;
									for (var m = 0; m < l; m++)
									{
										plusArray[m] = "+";
									}
									plus = plusArray.join("");
								}
							}
						}
					}
					if (temp > 0)
					{
						t+="[";
						for (var y = 0; y < temp; y++)
						{
							if (temp >= 16)
							{
								if ((temp - y) >= 16)
								{
									t+="?";
									y+=16;
								}
							}
							t+="+"
						}
						t+=",";
						t+=plus+"]";
						j+=count;	
					}

				}
				else if(golphisEven(count) == false)
				{
					var temp = 0;
					var smallestDiv = 99;
					for (var l = 2; l < 15; l++)
					{
						if (((count-1) / l) == (Math.round((count-1) / l)))
						{
							if (((count-1) / l) > 3)
							{
								var div = (count-1) / l;
								var len = l;
								if ((div + l) < smallestDiv)
								{
									smallestDiv = div + l;
									temp = (count-1) / l;
									for (var m = 0; m < l; m++)
									{
										plusArray[m] = "+";
									}
									plus = plusArray.join("");	
								}
							}
						}
					}
					if (temp > 0)
					{
						t+="[";
						for (var y = 0; y < temp; y++)
						{
							if (temp >= 16)
							{
								if ((temp - y) >= 16)
								{
									t+="?";
									y+=16;
								}
							}
							t+="+"
						}
						t+=",";
						t+=plus+"]"
						j+=(count-1);	
					}

				}

			}
			if (j > tex.charCodeAt(i))
			{
				var count = 0;
				for (var z = j-1; z > tex.charCodeAt(i);z--)
				{
					count++;
				}
				if(golphisEven(count))
				{
					var temp = 0;
					var smallestDiv = 99;
					for (var l = 2; l < 15; l++)
					{
						if ((count / l) == (Math.round(count / l)))
						{
							if ((count / l) > 1)
							{
								var div = count / l;
								var len = l;
								if ((div + l) < smallestDiv)
								{
									smallestDiv = div + l;
									temp = (count) / l;
									for (var m = 0; m < l; m++)
									{
										plusArray[m] = "+";
									}
									plus = plusArray.join("");
								}
							}
						}
					}
					if (temp > 0)
					{
						t+="[";
						for (var y = 0; y < temp; y++)
						{
							if (temp >= 16)
							{
								if ((temp - y) >= 16)
								{
									t+="!";
									y+=16;
								}
							}
							t+="-"
						}
						t+=",";
						t+=plus+"]"
						j-=count;	
					}

				}
				else if(golphisEven(count) == false)
				{
					var temp = 0;
					var smallestDiv = 99;
					for (var l = 2; l < 15; l++)
					{
						if (((count-1) / l) == (Math.round((count-1) / l)))
						{
							if (((count-1) / l) > 1)
							{
								var div = (count-1) / l;
								var len = l;
								if ((div + l) < smallestDiv)
								{
									smallestDiv = div + l;
									temp = (count-1) / l;
									for (var m = 0; m < l; m++)
									{
										plusArray[m] = "+";
									}
									plus = plusArray.join("");	
								}
							}

						}
					}
					if (temp > 0)
					{
						t+="[";
						for (var y = 0; y < temp; y++)
						{
							if (temp >= 16)
							{
								if ((temp - y) >= 16)
								{
									t+="!";
									y+=16;
								}
							}
							t+="-"
						}
						t+=",";
						t+=plus+"]"
						j-=(count-1);	
					}

				}

			}


			t+=(j>tex.charCodeAt(i))?"-":"+"
			if(j > tex.charCodeAt(i))
			{
				j--;
			}
			if (j < tex.charCodeAt(i))
			{
				j++;
			}
		}
		t+="<"
	}
	t+="=";
	t = golpherOptim(t);
	chan.value = t;
}
/*
+ +1
- -1

× +4
÷ -4

^ +8
@ -8

? +16
! -16

& +32
% -32

$ +64
# -64

: +128
; -128

` *2 Current Pointer
. /2 Current Pointer
*/
function lang(txt,out)
{
	txt = txt.value;
	i=0;
	output = txt.split("");
	code="";
	data="";
	for(j = 0;j<output.length;j++)
	{
		if(output[j]=="=")
		{
			try
			{
				data+=eval(code);
			}
			catch(err)
			{
				j = output.length;
				out.value = "Error: "+err;
			}
			
		}
		else if(output[j]=="<")
		{
			code+=String.fromCharCode(i);
		}
		else if (output[j] == "×")
		{
			i+=4;
		}
		else if(output[j] == "÷")
		{
			i-=4;
		}
		else if(output[j]=="'")
		{
			i = i * 2;
		}
		else if(output[j]==".")
		{
			i = i / 2;
		}
		else if(output[j]=="+")
		{
			i++;
		}
		else if (output[j]=="-")
		{
			i--;
		}
		else if (output[j]=="^")
		{
			i+=8;
		}
		else if (output[j] == "@")
		{
			i-=8;
		}
		else if (output[j]=="&")
		{
			i+=32;
		}
		else if (output[j]=="%")
		{
			i-=32;
		}
		else if (output[j]=="$")
		{
			i+=64;
		}
		else if (output[j]=="#")
		{
			i-=64;
		}
		else if (output[j]==":")
		{
			i+=128;
		}
		else if (output[j]==";")
		{
			i-=128;
		}
		else if (output[j] == "?")
		{
			i+=16;
		}
		else if (output[j] == "!")
		{
			i-=16;
		}
		else if (output[j]=="[")
		{
			var tempHold = 0;
			count = 0;
			for (var k = j+1; output[k]!=",";k++)
			{
				if(output[k]=="'")
				{
					tempHold = tempHold * 2;
				}
				if(output[k]==".")
				{
					tempHold = tempHold / 2;
				}
				if (output[k] == "×")
				{
					tempHold+=4;
				}
				if (output[k] == "÷")
				{
					tempHold-=4;
				}
				if (output[k] == "?")
				{
					tempHold+=16;
				}
				if (output[k] == "!")
				{
					tempHold-=16;
				}
				if (output[k] == "+")
				{
					tempHold++;
				}
				if (output[k] == "-")
				{
					tempHold--;
				}
				if (output[k] == "^")
				{
					tempHold+=8;
				}
				if (output[k] == "@")
				{
					tempHold-=8;
				}
				if (output[k] == "&")
				{
					tempHold+=32;
				}
				if (output[k] == "%")
				{
					tempHold-=32;
				}
				if (output[k] == "$")
				{
					tempHold+=64;
				}
				if (output[k] == "#")
				{
					tempHold-=64;
				}
				if (output[k] == ":")
				{
					tempHold+=128;
				}
				if (output[k] == ";")
				{
					tempHold-=128;
				}
			}
			j = k;
			var multi = 0;
			for (var k = j; output[k]!="]";k++)
			{
				if(output[k]=="'")
				{
					multi = multi * 2;
				}
				if(output[k]==".")
				{
					multi = multi / 2;
				}
				if (output[k] == "×")
				{
					multi+=4;
				}
				if (output[k] == "÷")
				{
					multi-=4;
				}
				if (output[k] == "+")
				{
					multi++;
				}
				if (output[k] == "-")
				{
					multi--;
				}
				if (output[k] == "?")
				{
					multi+=16;
				}
				if (output[k] == "!")
				{
					multi-=16;
				}
				if (output[k] == "^")
				{
					multi+=8;
				}
				if (output[k] == "@")
				{
					multi-=8;
				}
				if (output[k] == "&")
				{
					multi+=32;
				}
				if (output[k] == "%")
				{
					multi-=32;
				}
				if (output[k] == "$")
				{
					multi+=64;
				}
				if (output[k] == "#")
				{
					multi-=64;
				}
				if (output[k] == ":")
				{
					multi+=128;
				}
				if (output[k] == ";")
				{
					multi-=128;
				}
			}
			for (var z = 0; z < multi; z++)
			{
				i+=tempHold;
			}
			//i+=(tempHold * multi);
			j = k;
		}
	}
	out.value = data;
}



function golpherOptim(txt,chan)
{
	
	var originalLength = txt.length;
	var findPlus = [];
	var findMinus = [];
	var replPlus = [];
	var replMinus = [];
	txt = superOptim(txt);
	txt = megaOptim(txt);
	plus = "";
	minus = "";
	for (var i = 0; i < 15; i++)
	{
		plus+="+";
		minus+="-";
		findPlus[i] = plus;
		replPlus[14-i] = "?"+minus;
		findMinus[i] = minus;
		replMinus[14-i] = "!"+plus;
	}
	for (var j = findPlus.length-1; j > 0; j--)
	{
		if (findPlus[j].length > replPlus[j].length)
		{
			txt = txt.replaceAll(findPlus[j],replPlus[j]);
		}
		if (findMinus[j].length > replMinus[j].length)
		{
			txt = txt.replaceAll(findMinus[j],replMinus[j]);
		}
	}
	for(var x = 0; x < txt.length; x++)
	{
		txt = txt.replaceAll("++++++++","^"); //+8;
		txt = txt.replaceAll("--------","@"); //-8;
		txt = txt.replaceAll("!!","%"); //-32
		txt = txt.replaceAll("^^","?"); //+16;
		txt = txt.replaceAll("????????",":"); //+128
		txt = txt.replaceAll("!!!!!!!!",";"); //-128
		txt = txt.replaceAll("????","$"); //+64
		txt = txt.replaceAll("!!!!","#"); //-64
		txt = txt.replaceAll("??","&"); //+32
		txt = txt.replaceAll("@@","!"); //-16;
		txt = txt.replaceAll("&&&&",":"); //+128
		txt = txt.replaceAll("%%%%",";"); //-128
		txt = txt.replaceAll("&&","$"); //+64
		txt = txt.replaceAll("%%","#"); //-64
		txt = txt.replaceAll("$$",":"); //+128
		txt = txt.replaceAll("##",";"); //-128
		txt = txt.replaceAll("++++","×"); // +4
		txt = txt.replaceAll("----","÷"); // -4
		txt = txt.replaceAll("÷÷","@");
		txt = txt.replaceAll("××","^");
		txt = txt.replaceAll("+-","");
		txt = txt.replaceAll("-+","");
		txt = txt.replaceAll("-÷","÷-");
		txt = txt.replaceAll("+÷","÷+");
		txt = txt.replaceAll("+×","×+");
		txt = txt.replaceAll("-×","×-");
		txt = txt.replaceAll("-@","@-");
		txt = txt.replaceAll("+@","@+");
		txt = txt.replaceAll("-$","$-");
		txt = txt.replaceAll("+$","$+");
		txt = txt.replaceAll("-%","%-");
		txt = txt.replaceAll("+%","%+");
		txt = txt.replaceAll("-^","^-");
		txt = txt.replaceAll("+^","^+");
		txt = txt.replaceAll("-:",":-");
		txt = txt.replaceAll("+:",":+");
		txt = txt.replaceAll("-;",";-");
		txt = txt.replaceAll("+;",";+");
		txt = txt.replaceAll("-#","#-");
		txt = txt.replaceAll("+#","#+");
		txt = txt.replaceAll("-?","?-");
		txt = txt.replaceAll("-!","!-");
		txt = txt.replaceAll("+!","!+");
		txt = txt.replaceAll("+?","?+");
	}
	for (var w = 0; w < txt.length; w++)
	{
		txt = txt.replaceAll("+++","×-"); // +3
		txt = txt.replaceAll("---","÷+"); // -3
		txt = txt.replaceAll("$&?",":!"); //64+32+16 -> 128-16
		txt = txt.replaceAll("$?&",":!"); //64+32+16 -> 128-16
		txt = txt.replaceAll("&$?",":!"); //64+32+16 -> 128-16
		txt = txt.replaceAll("?&$",":!"); //64+32+16 -> 128-16
		txt = txt.replaceAll("&?$",":!"); //64+32+16 -> 128-16

	}

	if(chan!=undefined)
	{
		var newLength = txt.length;
		sendMessage("Optimized Code ("+originalLength+" characters vs "+newLength+" characters)\n```"+txt+"```",chan);
	}
	else
	{
		//console.log(txt);
		return txt;
	}
}

/*
+ +1
- -1

× +4
÷ -4

^ +8
@ -8

? +16
! -16

& +32
% -32

$ +64
# -64

: +128
; -128

` *2 Current Pointer
. /2 Current Pointer
*/

function superOptim(txt)
{
	output = txt.split("");
	for (var j = 0; j < output.length; j++)
	{
		if (output[j]=="[")
		{
			var hold = "[";
			var tempHold = 0;
			count = 0;
			var answer = 0;
			for (var k = j+1; output[k]!=",";k++)
			{
				if (output[k] == "×")
				{
					hold+="×";
					tempHold+=4;
				}
				if (output[k] == "÷")
				{
					hold+="÷";
					tempHold-=4;
				}
				if (output[k] == "^")
				{
					hold+="^";
					tempHold+=8;
				}
				if (output[k] == "@")
				{
					hold+="@";
					tempHold-=8;
				}
				if (output[k] =="&")
				{
					hold+="&";
					tempHold+=32;
				}
				if (output[k] == "%")
				{
					hold+="%";
					tempHold-=32;
				}
				if (output[k] == "$")
				{
					hold+="$";
					tempHold+=64;
				}
				if (output[k] == "#")
				{
					hold+="#";
					tempHold-=64;
				}
				if (output[k] == ":")
				{
					hold+=":";
					tempHold+=128;
				}
				if (output[k] == ";")
				{
					hold+=";";
					tempHold-=128;
				}
				if (output[k] == "?")
				{
					hold+="?";
					tempHold+=16;
				}
				if (output[k] == "!")
				{
					hold+="!";
					tempHold-=16;
				}
				if (output[k] == "+")
				{
					hold+="+";
					tempHold++;
				}
				if (output[k] == "-")
				{
					hold+="-";
					tempHold--;
				}
			}
			hold+=",";
			j = k;
			var multi = 0;
			for (var k = j; output[k]!="]";k++)
			{
				if (output[k] == "×")
				{
					hold+="×";
					multi+=4;
				}
				if (output[k] == "÷")
				{
					hold+="÷";
					multi-=4;
				}
				if (output[k] == "^")
				{
					hold+="^";
					multi+=8;
				}
				if (output[k] == "@")
				{
					hold+="@";
					multi-=8;
				}
				if (output[k] =="&")
				{
					hold+="&";
					multi+=32;
				}
				if (output[k] == "%")
				{
					hold+="%";
					multi-=32;
				}
				if (output[k] == "$")
				{
					hold+="$";
					multi+=64;
				}
				if (output[k] == "#")
				{
					hold+="#";
					multi-=64;
				}
				if (output[k] == ":")
				{
					hold+=":";
					multi+=128;
				}
				if (output[k] == ";")
				{
					hold+=";";
					multi-=128;
				}
				if (output[k] == "+")
				{
					hold+="+";
					multi++;
				}
				if (output[k] == "-")
				{
					hold+="-";
					multi--;
				}
				if (output[k] == "?")
				{
					hold+="?";
					multi+=16;
				}
				if (output[k] == "!")
				{
					hold+=+"!";
					multi-=16;
				}
			}
			hold+="]";
			for (var z = 0; z < multi; z++)
			{
				answer+=tempHold;
			}
			var newTemp = "";
			for (var y = 0; y < answer;)
			{
				if ((answer - y) >= 128)
				{
					newTemp+=":";
					y+=128;
				}
				else if ((answer - y) >= 64)
				{
					newTemp+="$";
					y+=64;
				}
				else if ((answer - y) >= 32)
				{
					newTemp+="&";
					y+=32;
				}
				else if ((answer - y) >= 16)
				{
					newTemp+="?";
					y+=16;
				}
				else if ((answer - y) >= 8)
				{
					newTemp+="^";
					y+=8;
				}
				else if ((answer - y) >= 4)
				{
					newTemp+="×";
					y+=4;
				}
				else
				{
					newTemp+="+";
					y++;
				}
			}
			for (var y = 0; y > answer;)
			{
				if (Math.abs(answer - y) >= 128)
				{
					newTemp+=";";
					y-=128;
				}
				else if (Math.abs(answer - y) >=64)
				{
					newTemp+="#";
					y-=64;
				}
				else if (Math.abs(answer - y) >= 32)
				{
					newTemp+="%";
					y-=32;
				}
				else if (Math.abs(answer - y) >= 16)
				{
					newTemp+="!";
					y-=16;
				}
				else if (Math.abs(answer - y) >= 8)
				{
					newTemp+="@";
					y-=8;
				}
				else if (Math.abs(answer - y) >= 4)
				{
					newTemp+="÷";
					y-=4;
				}
				else
				{
					newTemp+="-";
					y--;
				}
			}
			if (newTemp.length < hold.length)
			{
				txt = txt.replace(hold,newTemp);
			}
			//i+=(tempHold * multi);
			j = k;
		}
		var plusHold = "";
		var test = 0;
		if (output[j] == "×")
		{
			plusHold+="×";
			test+=4;
		}
		if (output[j] == "÷")
		{
			plusHold+="÷";
			test-=4;
		}
		if (output[j] == "^")
		{
			plusHold+="^";
			test+=8;
		}
		if (output[j] == "@")
		{
			plusHold+="@";
			test-=8;
		}
		if (output[j] =="&")
		{
			plusHold+="&";
			test+=32;
		}
		if (output[j] == "%")
		{
			plusHold+="%";
			test-=32;
		}
		if (output[j] == "$")
		{
			plusHold+="$";
			test+=64;
		}
		if (output[j] == "#")
		{
			plusHold+="#";
			test-=64;
		}
		if (output[j] == ":")
		{
			plusHold+=":";
			test+=128;
		}
		if (output[j] == ";")
		{
			plusHold+=";";
			test-=128;
		}
		if (output[j]=="+")
		{
			test++;
			plusHold+="+";
		}
		if (output[j]=="-")
		{
			test--;
			plusHold+="-";
		}
		if (output[j]=="?")
		{
			test+=16;
			plusHold+="?";
		}
		if (output[j]=="!")
		{
			test-=16;
			plusHold+="!";
		}
		if (output[j]=="<")
		{
			var betterHold = "";
			var optim = 0;
			for (var y = 0; y < test;)
			{
				if ((test - y) >= 128)
				{
					betterHold+=":";
					y+=128;
				}
				else if ((test - y) >= 64)
				{
					betterHold+="$";
					y+=64;
				}
				else if ((test - y) >= 32)
				{
					betterHold+="&";
					y+=32;
				}
				else if ((test - y) >= 16)
				{
					betterHold+="?";
					y+=16;
				}
				else if ((test - y) >= 8)
				{
					betterHold+="^";
					y+=8;
				}
				else if ((test - y) >= 4)
				{
					betterHold+="×";
					y+=4;
				}
				else
				{
					betterHold+="+";
					y++;
				}
			}
			for (var y = 0; y > test;)
			{
				if (Math.abs(test - y) >= 128)
				{
					betterHold+=";";
					y-=128;
				}
				else if (Math.abs(test - y) >= 64)
				{
					betterHold+="#";
					y-=64;
				}
				else if (Math.abs(test - y) >= 32)
				{
					betterHold+="%";
					y-=32;
				}
				else if (Math.abs(test - y) >= 16)
				{
					betterHold+="!";
					y-=16;
				}
				else if (Math.abs(test - y) >= 8)
				{
					betterHold+="@";
					y-=8;
				}
				else if (Math.abs(test - y) >= 4)
				{
					betterHold+="÷";
					y-=4;
				}
				else
				{
					betterHold+="-";
					y--;
				}
			}
			if (betterHold.length < plusHold.length)
			{
				txt = txt.replace(plusHold,betterHold);
			}
		}
	}
	return txt;
}

function megaOptim(txt)
{
	var tempTxt = txt;
	output = tempTxt.split("");
	for (var j = 0; j < output.length; j++)
	{
		if (output[j]=="[")
		{
			var hold = "[";
			var tempHold = 0;
			count = 0;
			var answer = 0;
			for (var k = j+1; output[k]!=",";k++)
			{
				if (output[k] == "×")
				{
					hold+="×";
					tempHold+=4;
				}
				if (output[k] == "÷")
				{
					hold+="÷";
					tempHold-=4;
				}
				if (output[k] == "^")
				{
					hold+="^";
					tempHold+=8;
				}
				if (output[k] == "@")
				{
					hold+="@";
					tempHold-=8;
				}
				if (output[k] =="&")
				{
					hold+="&";
					tempHold+=32;
				}
				if (output[k] == "%")
				{
					hold+="%";
					tempHold-=32;
				}
				if (output[k] == "$")
				{
					hold+="$";
					tempHold+=64;
				}
				if (output[k] == "#")
				{
					hold+="#";
					tempHold-=64;
				}
				if (output[k] == ":")
				{
					hold+=":";
					tempHold+=128;
				}
				if (output[k] == ";")
				{
					hold+=";";
					tempHold-=128;
				}
				if (output[k] == "?")
				{
					hold+="?";
					tempHold+=16;
				}
				if (output[k] == "!")
				{
					hold+="!";
					tempHold-=16;
				}
				if (output[k] == "+")
				{
					hold+="+";
					tempHold++;
				}
				if (output[k] == "-")
				{
					hold+="-";
					tempHold--;
				}
			}
			hold+=",";
			j = k;
			var multi = 0;
			for (var k = j; output[k]!="]";k++)
			{
				if (output[k] == "×")
				{
					hold+="×";
					multi+=4;
				}
				if (output[k] == "÷")
				{
					hold+="÷";
					multi-=4;
				}
				if (output[k] == "^")
				{
					hold+="^";
					multi+=8;
				}
				if (output[k] == "@")
				{
					hold+="@";
					multi-=8;
				}
				if (output[k] =="&")
				{
					hold+="&";
					multi+=32;
				}
				if (output[k] == "%")
				{
					hold+="%";
					multi-=32;
				}
				if (output[k] == "$")
				{
					hold+="$";
					multi+=64;
				}
				if (output[k] == "#")
				{
					hold+="#";
					multi-=64;
				}
				if (output[k] == ":")
				{
					hold+=":";
					multi+=128;
				}
				if (output[k] == ";")
				{
					hold+=";";
					multi-=128;
				}
				if (output[k] == "+")
				{
					hold+="+";
					multi++;
				}
				if (output[k] == "-")
				{
					hold+="-";
					multi--;
				}
				if (output[k] == "?")
				{
					hold+="?";
					multi+=16;
				}
				if (output[k] == "!")
				{
					hold+=+"!";
					multi-=16;
				}
			}
			hold+="]";
			for (var z = 0; z < multi; z++)
			{
				answer+=tempHold;
			}
			var newTemp = "";
			for (var y = 0; y < answer;)
			{
				if ((answer - y) >= 128)
				{
					newTemp+=":";
					y+=128;
				}
				else if ((answer - y) >= 64)
				{
					newTemp+="$";
					y+=64;
				}
				else if ((answer - y) >= 32)
				{
					newTemp+="&";
					y+=32;
				}
				else if ((answer - y) >= 16)
				{
					newTemp+="?";
					y+=16;
				}
				else if ((answer - y) >= 8)
				{
					newTemp+="^";
					y+=8;
				}
				else if ((answer - y) >= 4)
				{
					newTemp+="×";
					y+=4;
				}
				else
				{
					newTemp+="+";
					y++;
				}
			}
			for (var y = 0; y > answer;)
			{
				if (Math.abs(answer - y) >= 128)
				{
					newTemp+=";";
					y-=128;
				}
				else if (Math.abs(answer - y) >=64)
				{
					newTemp+="#";
					y-=64;
				}
				else if (Math.abs(answer - y) >= 32)
				{
					newTemp+="%";
					y-=32;
				}
				else if (Math.abs(answer - y) >= 16)
				{
					newTemp+="!";
					y-=16;
				}
				else if (Math.abs(answer - y) >= 8)
				{
					newTemp+="@";
					y-=8;
				}
				else if (Math.abs(answer - y) >= 4)
				{
					newTemp+="÷";
					y-=4;
				}
				else
				{
					newTemp+="-";
					y--;
				}
			}
			tempTxt = tempTxt.replace(hold,newTemp);
			//i+=(tempHold * multi);
			j = k;
		}
		var plusHold = "";
		var test = 0;
		if (output[j] == "×")
		{
			plusHold+="×";
			test+=4;
		}
		if (output[j] == "÷")
		{
			plusHold+="÷";
			test-=4;
		}
		if (output[j] == "^")
		{
			plusHold+="^";
			test+=8;
		}
		if (output[j] == "@")
		{
			plusHold+="@";
			test-=8;
		}
		if (output[j] =="&")
		{
			plusHold+="&";
			test+=32;
		}
		if (output[j] == "%")
		{
			plusHold+="%";
			test-=32;
		}
		if (output[j] == "$")
		{
			plusHold+="$";
			test+=64;
		}
		if (output[j] == "#")
		{
			plusHold+="#";
			test-=64;
		}
		if (output[j] == ":")
		{
			plusHold+=":";
			test+=128;
		}
		if (output[j] == ";")
		{
			plusHold+=";";
			test-=128;
		}
		if (output[j]=="+")
		{
			test++;
			plusHold+="+";
		}
		if (output[j]=="-")
		{
			test--;
			plusHold+="-";
		}
		if (output[j]=="?")
		{
			test+=16;
			plusHold+="?";
		}
		if (output[j]=="!")
		{
			test-=16;
			plusHold+="!";
		}
		if (output[j]=="<")
		{
			var betterHold = "";
			var optim = 0;
			for (var y = 0; y < test;)
			{
				if ((test - y) >= 128)
				{
					betterHold+=":";
					y+=128;
				}
				else if ((test - y) >= 64)
				{
					betterHold+="$";
					y+=64;
				}
				else if ((test - y) >= 32)
				{
					betterHold+="&";
					y+=32;
				}
				else if ((test - y) >= 16)
				{
					betterHold+="?";
					y+=16;
				}
				else if ((test - y) >= 8)
				{
					betterHold+="^";
					y+=8;
				}
				else if ((test - y) >= 4)
				{
					betterHold+="×";
					y+=4;
				}
				else
				{
					betterHold+="+";
					y++;
				}
			}
			for (var y = 0; y > test;)
			{
				if (Math.abs(test - y) >= 128)
				{
					betterHold+=";";
					y-=128;
				}
				else if (Math.abs(test - y) >= 64)
				{
					betterHold+="#";
					y-=64;
				}
				else if (Math.abs(test - y) >= 32)
				{
					betterHold+="%";
					y-=32;
				}
				else if (Math.abs(test - y) >= 16)
				{
					betterHold+="!";
					y-=16;
				}
				else if (Math.abs(test - y) >= 8)
				{
					betterHold+="@";
					y-=8;
				}
				else if (Math.abs(test - y) >= 4)
				{
					betterHold+="÷";
					y-=4;
				}
				else
				{
					betterHold+="-";
					y--;
				}
			}
			tempTxt = tempTxt.replace(plusHold,betterHold);
		}
	}
	if (tempTxt.length < txt.length)
	{
		return tempTxt;
	}
	else
	{
		return txt;
	}

}

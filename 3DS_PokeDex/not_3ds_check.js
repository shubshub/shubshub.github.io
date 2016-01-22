var debug = 0
var new_3ds = 0;
if (debug !=1)
{
	if (navigator.userAgent.indexOf('Nintendo 3DS') == -1) 
	{ //If the UserAgent is not "Nintendo 3DS"
		location.replace('./not_3ds.html'); //Redirect to an other page
	}
	if (navigator.userAgent.indexOf('New Nintendo 3DS') != -1) //New Nintendo 3DS not Supported Yet
	{
		var new_3ds = 1;
	}
}
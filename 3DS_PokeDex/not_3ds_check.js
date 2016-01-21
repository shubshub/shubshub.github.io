var debug = 0
var new_3ds_check = 1;
if (debug !=1)
{
	if (navigator.userAgent.indexOf('Nintendo 3DS') == -1) 
	{ //If the UserAgent is not "Nintendo 3DS"
		location.replace('./not_3ds.html'); //Redirect to an other page
	}
}
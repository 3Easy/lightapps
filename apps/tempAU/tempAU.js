// tempAU.js - Temperatures in the capital cities, courtesy of BOM, translated to colors
//

// Every app has an object
function tempAU() {

	this.appStart = appStart;
	this.appQuit = appQuit;
	
	function appStart() {
		console.log("tempAU.appStart");
	}
	
	function appQuit() {
		console.log("tempAU.appQuit");
	}
}

function tempAU_select(c) {
	city = c.slice(7);
	console.log("tempAU_select " + city);
	currentLight.sendcmdparam("tempAU.py", "city", city);
}


// uvAU.js - UV indices in the capital cities, courtesy of NUCLEAR RADIATION
//

// Every app has an object
function uvAU() {

	this.appStart = appStart;
	this.appQuit = appQuit;
	
	function appStart() {
		console.log("uvAU.appStart");
	}
	
	function appQuit() {
		console.log("uvAU.appQuit");
	}
}

function uvAU_select(c) {
	city = c.slice(5);
	console.log("uvAU_select " + city);
	currentLight.sendcmdparam("uvAU.py", "city", city);
}


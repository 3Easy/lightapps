// airHK.js - UV indices in the capital cities, courtesy of NUCLEAR RADIATION
//

// Every app has an object
function airHK() {

	this.appStart = appStart;
	this.appQuit = appQuit;
	
	function appStart() {
		console.log("airHK.appStart");
	}
	
	function appQuit() {
		console.log("airHK.appQuit");
	}
}

function airHK_select(c) {
	site = c.slice(6);
	console.log("airHK_select " + site);
	currentLight.sendcmdparam("airHK.py", "site", site);
}


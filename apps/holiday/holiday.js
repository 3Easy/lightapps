// holiday.js - Pretty holiday lights
//

// Every app has an object
function holiday() {

	this.appStart = appStart;
	this.appQuit = appQuit;
	this.beginLights = beginLights;
	this.startbutton = holiday_startbutton;
	this.stopbutton = holiday_stopbutton;
	this.randcv = randcv;
	this.timer = timer;
	this.counter = null;

	function appStart() {
		console.log("holiday.appStart");
	}
	
	function beginLights() {
		theApp.timer();
		theApp.counter = setInterval(theApp.timer, 500); // run every 500 msec
	}
	
	function appQuit() {
		console.log("holiday.appQuit");
		console.log(theApp.running);
		clearInterval(theApp.counter);
		currentLight.setlamp(0,0,0);
	}
	
	function randcv() { 
		return Math.floor((Math.random()*32)+1); 
	}
	
	function timer() {
	
		var c = [0, 0, 0];
		for (var j = 0; j < 52; j++ ) {
			c[0] = theApp.randcv();
			c[1] = theApp.randcv();
			c[2] = theApp.randcv();
			var index = Math.floor((Math.random()*2)+1);
			c[index] = 0;
			currentLight.fastset(c[0], c[1], c[2], j);
		}
		currentLight.fastlights();
	
	}
}

function holiday_startbutton() {
	console.log("holiday_startbutton");
	theApp.beginLights();
}

function holiday_stopbutton() {
	console.log("holiday_stopbutton");
	clearInterval(theApp.counter);
	currentLight.setlamp(0,0,0);
}

/*
	@file: apps/candle/candle.js
*/

// Every app has an object
function candle() {

	this.appStart = appStart;
	this.appQuit = appQuit;
	this.running = false;
	this.startbutton = candle_startbutton;
	this.stopbutton = candle_stopbutton;
	
	function appStart() {
		console.log("candle.appStart");
	}
	
	function appQuit() {
		console.log("candle.appQuit");
	}
}

function candle_startbutton() {
	console.log("candle_startbutton");
	currentLight.sendcmd("candle-start.sh");
	theApp.running = true;
}

function candle_stopbutton() {
	console.log("candle_stopbutton");
	currentLight.sendcmd("candle-quit.sh");
	theApp.running = false;
}

/*
	@file: apps/flame/flame.js
*/

function flame() {

	this.appStart = appStart;
	this.appQuit = appQuit;
	this.running = false;
	this.startbutton = flame_startbutton;
	this.stopbutton = flame_stopbutton;
	
	function appStart() {
		console.log("flame.appStart");
	}
	
	function appQuit() {
		console.log("flame.appQuit");
	}
}

function flame_startbutton() {
	console.log("flame_startbutton");
	currentLight.sendcmd("flame-start.sh");
	theApp.running = true;
}

function flame_stopbutton() {
	console.log("flame_stopbutton");
	currentLight.sendcmd("flame-quit.sh");
	theApp.running = false;
}

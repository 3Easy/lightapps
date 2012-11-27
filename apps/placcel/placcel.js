/*
	@file: apps/placcel/placcel.js
*/

function placcel() {

	this.appStart = appStart;
	this.appQuit = appQuit;
	this.running = false;
	this.startbutton = placcel_startbutton;
	this.stopbutton = placcel_stopbutton;
	
	function appStart() {
		console.log("placcel.appStart");
	}
	
	function appQuit() {
		console.log("placcel.appQuit");
	}
}

function placcel_startbutton() {
	console.log("placcel_startbutton");
	currentLight.sendcmd("placcel-start.sh");
	theApp.running = true;
}

function placcel_stopbutton() {
	console.log("placcel_stopbutton");
	currentLight.sendcmd("placcel-quit.sh");
	theApp.running = false;
}

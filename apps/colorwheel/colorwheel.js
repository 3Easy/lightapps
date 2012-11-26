/*
	@file: apps/colorwheel/colorwheel.js
*/
function colorwheel() {
	
	this.theCanvas = document.getElementById('colorwheel_canvas');
	this.context = this.theCanvas.getContext('2d');
	
	this.thePicked = document.getElementById('colorwheel_picked');
	this.pickcontext = this.thePicked.getContext('2d');
	
	this.theComplement = document.getElementById('colorwheel_complement');
	this.compcontext = this.theComplement.getContext('2d');
	
	this.mouseX = 0;
	this.mouseY = 0;
	this.compR = 0;
	this.compG = 0;
	this.compB = 0;
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.fillpick = fillpick;
	this.fillcomp = fillcomp;
	this.onMouseMove = onMouseMove;
	this.onMouseClick = onMouseClick;
	this.onCompClick = onCompClick;
	this.onTouchMove = onTouchMove;
	this.onTouchStart = onTouchStart;
	
	function appStart() {
		console.log("colorwheel.appStart");
		this.tileSheet=new Image();
		$(this.tileSheet).load(colorwheelLoaded);
		this.tileSheet.src="apps/colorwheel/colorwheel.png";
	}
	
	function appQuit() {
		console.log("colorwheel.appQuit");
	}
	
	function fillpick(red, green, blue){
		redstr = red.toString(16);
		if (redstr.length < 2) {
			redstr = "0" + redstr;
		}
		greenstr = green.toString(16);
		if (greenstr.length < 2) {
			greenstr = "0" + greenstr;
		}
		bluestr = blue.toString(16);
		if (bluestr.length < 2) {
			bluestr = "0" + bluestr;
		}
		theApp.pickcontext.fillStyle="#" + redstr + greenstr + bluestr;
		theApp.pickcontext.fillRect(0,0,350,100);
	}
	
	function fillcomp(red, green, blue){
		theApp.compR = red = 255 - red;
		theApp.compG = green = 255 - green;
		theApp.compB = blue = 255 - blue;
		//console.log(red, green, blue)
		redstr = red.toString(16);
		//console.log(redstr);
		if (redstr.length < 2) {
			redstr = "0" + redstr;
		}
		//console.log(redstr);
		greenstr = green.toString(16);
		if (greenstr.length < 2) {
			greenstr = "0" + greenstr;
		}
		bluestr = blue.toString(16);
		if (bluestr.length < 2) {
			bluestr = "0" + bluestr;
		}
		fs = "#" + redstr + greenstr + bluestr;
		//console.log(fs);
		theApp.compcontext.fillStyle=fs;
		//console.log(compcontext.fillStyle);
		theApp.compcontext.fillRect(0,0,350,100);			
	}	
	
	function onMouseMove(e) {
		theApp.mouseX = e.clientX - (theApp.theCanvas.offsetLeft + $(theApp.theCanvas).parent().parent()[0].offsetLeft);
		theApp.mouseY = e.clientY - (theApp.theCanvas.offsetTop + $(theApp.theCanvas).parent().parent()[0].offsetTop);	      
	}
	
	function onMouseClick(e) {
		theApp.mouseX = e.clientX - (theApp.theCanvas.offsetLeft + $(theApp.theCanvas).parent().parent()[0].offsetLeft);
		theApp.mouseY = e.clientY - (theApp.theCanvas.offsetTop + $(theApp.theCanvas).parent().parent()[0].offsetTop);	   
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = (imageData.data[0] >> 1) | 0x80;
		var green = (imageData.data[1] >> 1) | 0x80;
		var blue = (imageData.data[2] >> 1) | 0x80;
		console.log("color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		fillpick(imageData.data[0], imageData.data[1], imageData.data[2]);
		fillcomp(imageData.data[0], imageData.data[1], imageData.data[2]);
		currentLight.setlamp(red, green, blue);
	}

	function onCompClick(e) {
		var red = (compR >> 1) | 0x80;
		var green = (compG >> 1) | 0x80;
		var blue = (compB >> 1) | 0x80;
		console.log("complement color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		currentLight.setlamp(red, green, blue);
	}
	
	function onTouchStart(e) {
		var touch = e.touches[0];
		console.log("onTouchStart", touch.clientX, touch.clientY );
		theApp.mouseX = touch.clientX - (theApp.theCanvas.offsetLeft + $(theApp.theCanvas).parent().parent()[0].offsetLeft);
		theApp.mouseY = touch.clientY - (theApp.theCanvas.offsetTop + $(theApp.theCanvas).parent().parent()[0].offsetTop);	   
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = (imageData.data[0] >> 1) | 0x80;
		var green = (imageData.data[1] >> 1) | 0x80;
		var blue = (imageData.data[2] >> 1) | 0x80;
		console.log("color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		fillpick(imageData.data[0], imageData.data[1], imageData.data[2]);
		fillcomp(imageData.data[0], imageData.data[1], imageData.data[2]);
		currentLight.setlamp(red, green, blue);
		theApp.lastTouch = new Date().getTime();
	}
	
	function onTouchMove(e) {
		console.log("onTouchMove");
		event.preventDefault();
		curr = new Date().getTime();
		if ((curr - theApp.lastTouch) > 100) {
			theApp.onTouchStart(e);
		} else {
			console.log("ignoring");
		}
	}
	
		
	this.theCanvas.addEventListener("mousemove", this.onMouseMove, false);
	this.theCanvas.addEventListener("click", this.onMouseClick, false);
	this.theCanvas.addEventListener("touchstart", this.onTouchStart, false);
	this.theCanvas.addEventListener("touchmove", this.onTouchMove, false);
	this.theComplement.addEventListener("click", this.onCompClick, false);
	
}

	
function colorwheelLoaded() {
	console.log("colorwheelLoaded");
	//console.log(theApp.tileSheet);
	theApp.context.drawImage(theApp.tileSheet, 0, 0);	
}
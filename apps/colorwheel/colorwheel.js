// Main entry function

function colorwheel() {
	
	//console.log("Colorwheeeeeeel")

	this.theCanvas = document.getElementById('canvas');
	this.context = this.theCanvas.getContext('2d');
	
	this.thePicked = document.getElementById('picked');
	this.pickcontext = this.thePicked.getContext('2d');
	
	this.theComplement = document.getElementById('complement');
	this.compcontext = this.theComplement.getContext('2d');
	
	this.mouseX = 0;
	this.mouseY = 0;
	this.compR = 0;
	this.compG = 0;
	this.compB = 0;
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.drawTileSheet = drawTileSheet;
	this.fillpick = fillpick;
	this.fillcomp = fillcomp;
	this.onMouseMove = onMouseMove;
	this.onMouseClick = onMouseClick;
	this.onCompClick = onCompClick;
	this.eventSheetLoaded = eventSheetLoaded;
	
	function eventSheetLoaded() {
		theApp.drawTileSheet();		// Ensures the image is only drawn after it gets loaded
	}
		
	function appStart() {
		this.tileSheet=new Image();
		$(this.tileSheet).load(eventSheetLoaded);
		this.tileSheet.src="apps/colorwheel/colorwheel.png";
	}
	
	function appQuit() {
	}
	
	function drawTileSheet() {
		this.context.drawImage(this.tileSheet, 0, 0);	
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
		this.pickcontext.fillStyle="#" + redstr + greenstr + bluestr;
		this.pickcontext.fillRect(0,0,350,100);
	}
	
	function fillcomp(red, green, blue){
		this.compR = red = 255 - red;
		this.compG = green = 255 - green;
		this.compB = blue = 255 - blue;
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
		this.compcontext.fillStyle=fs;
		//console.log(compcontext.fillStyle);
		this.compcontext.fillRect(0,0,350,100);			
	}	
	
	function onMouseMove(e) {
		theApp.mouseX=e.clientX-theApp.theCanvas.offsetLeft;
		theApp.mouseY=e.clientY-theApp.theCanvas.offsetTop;
		//console.log(mouseX, mouseY);
	}
	
	function onMouseClick(e) {
		console.log("click: " + theApp.mouseX + "," + theApp.mouseY);
		imageData=theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = (imageData.data[0] >> 1) | 0x80;
		var green = (imageData.data[1] >> 1) | 0x80;
		var blue = (imageData.data[2] >> 1) | 0x80;
		console.log("color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")");
		
		theApp.fillpick(imageData.data[0], imageData.data[1], imageData.data[2]);
		theApp.fillcomp(imageData.data[0], imageData.data[1], imageData.data[2]);
		currentLight.setlamp(red, green, blue);
	}

	function onCompClick(e) {
		console.log("click: " + theApp.mouseX + "," + theApp.mouseY);
		imageData=theApp.compcontext.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = (compR >> 1) | 0x80;
		var green = (compG >> 1) | 0x80;
		var blue = (compB >> 1) | 0x80;
		console.log("complement color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")");
		currentLight.setlamp(red, green, blue);
		
	}
	
	this.theCanvas.addEventListener("mousemove", this.onMouseMove, false);
	this.theCanvas.addEventListener("click", this.onMouseClick, false);
	this.theComplement.addEventListener("click", this.onCompClick, false);
	
}


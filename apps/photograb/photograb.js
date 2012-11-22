window.addEventListener('load', eventWindowLoaded, false);	
function eventWindowLoaded() {

	sampApp();
	canvasApp();
	iPhone = navigator.userAgent.toLowerCase().indexOf("iphone");
	iPad = navigator.userAgent.toLowerCase().indexOf("iPad");
	console.log(iPhone, iPad);
	
}

function canvasSupport () {
  	return Modernizr.canvas;
}

var context;
var theCanvas;
var img;
var iPhone = false;
var iPad = false;
var lastTouch;

function canvasApp(){
	

	if (!canvasSupport()) {
			 return;
  	} else {
	    theCanvas = document.getElementById('canvas');
	    context = theCanvas.getContext('2d');
	    console.log("Got context");
	    console.log(screen.width, screen.height);
	    theCanvas.width = screen.width;
		theCanvas.height = screen.height;

	}
	
	context.fillStyle = "#000000";
	context.fillRect(0, 0, theCanvas.width, theCanvas.height);

	var mouseX;
	var mouseY;

	function onMouseMove(e) {
		mouseX=e.clientX-theCanvas.offsetLeft;
		mouseY=e.clientY-theCanvas.offsetTop;	      
	}
	
	function onMouseClick(e) {
		console.log("click: " + mouseX + "," + mouseY);
		imageData=context.getImageData(mouseX,mouseY,1,1);
		var red = (imageData.data[0] >> 1) | 0x80;
		var green = (imageData.data[1] >> 1) | 0x80;
		var blue = (imageData.data[2] >> 1) | 0x80;
		console.log("color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		
		// This is where we'll call ajaxcolor
		redstr = red.toString(16);
		greenstr = green.toString(16);
		bluestr = blue.toString(16);
		ajaxstr = "0x" +  greenstr + redstr + bluestr;
		console.log("ajaxstr: " + ajaxstr);
		jQuery.ajax({
			url: '/cgi-bin/ajaxcolor', 
			data: {color: ajaxstr}
		});

	}

	function onTouchStart(e) {
		var touch = e.touches[0];
		console.log("onTouchStart", touch.clientX, touch.clientY );
		mouseX=touch.clientX-theCanvas.offsetLeft;
		mouseY=touch.clientY-theCanvas.offsetTop;
		console.log("touch: " + mouseX + "," + mouseY);
		imageData=context.getImageData(mouseX,mouseY,1,1);
		var red = (imageData.data[0] >> 1) | 0x80;
		var green = (imageData.data[1] >> 1) | 0x80;
		var blue = (imageData.data[2] >> 1) | 0x80;
		console.log("color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		
		// This is where we'll call ajaxcolor
		redstr = red.toString(16);
		greenstr = green.toString(16);
		bluestr = blue.toString(16);
		ajaxstr = "0x" +  greenstr + redstr + bluestr;
		console.log("ajaxstr: " + ajaxstr);
		//fillpick(imageData.data[0], imageData.data[1], imageData.data[2]);
		//fillcomp(imageData.data[0], imageData.data[1], imageData.data[2]);
		jQuery.ajax({
			url: '/cgi-bin/ajaxcolor', 
			data: {color: ajaxstr}
		});
		lastTouch = new Date().getTime();
	}
	
	function onTouchMove(e) {
		console.log("onTouchMove");
		event.preventDefault();
		curr = new Date().getTime();
		if ((curr - lastTouch) > 100) {
			onTouchStart(e);
		} else {
			console.log("ignoring");
		}
	}

		
	theCanvas.addEventListener("mousemove", onMouseMove, false);
	theCanvas.addEventListener("click", onMouseClick, false);
	theCanvas.addEventListener("touchstart", onTouchStart, false);
	theCanvas.addEventListener("touchmove", onTouchMove, false);

}

function sampSupport () {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		return true;
	} else {
		return false;
	}
}

function sampApp(){

	if (sampSupport == false) {
		alert("HTML5 file upload not fully supported!");
		return;
	} else {
		console.log("HTML5 file upload fully supported.");
	}
}

function doSomething(){
	console.log("what would you like me to do?");
	console.log( $("#pic").val());
}

function imageLoaded() {

	console.log("imageLoaded");

	// Should we maybe resize based on the image size?
	console.log(img.width, img.height);
	var scalefactor;

	if (iPhone > 0) {
		console.log("iPhone...");
		context.rotate(0.0);		// Rotate 90 degrees

	}

	// figure out which is bigger, the image or the canvas
	if ((img.width > theCanvas.width) || (img.height > theCanvas.height)) {

		// Figure out which side needs more scaling
		bigw = theCanvas.width / img.width;
		bigh = theCanvas.height / img.height;
		if (bigh <= bigw) {
			scalefactor = bigh;
		} else {
			scalefactor = bigw;
		}
		
	} else {
		// We don't have to scale anything.
		// Which is, you know, nice.
		console.log("No scaling required.");
		scalefactor = 1.0;
	}

	//theCanvas.width = img.width;
	//theCanvas.height = img.height;
	
	//context.scale(scalefactor, scalefactor);
	context.fillStyle = "#000000";
	context.fillRect(0, 0, theCanvas.width, theCanvas.height);
	context.drawImage(img, 0, 0);
	
}
	
function handlefiles(tf){
	console.log("handlefiles got ", tf.length, " files");	

	img = new Image();
	img.name = "thingy";
    img.classList.add("obj");
    img.file = tf[0];
	img.addEventListener('load', imageLoaded , false);
    console.log("grabbing ", img.file);
     
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(tf[0]);
    while (reader.readyState == false) {
    	var x = 1;
    }
    console.log(img);
	return;
}
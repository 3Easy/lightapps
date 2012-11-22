// photograb.js - samples a photo, and sends the sampled color to a Light
//

// Every app has an object
function photograb() {

	function appStart() {
		sampApp();
	}
		
	this.img = null;
	this.lastTouch = null;
	this.appStart = appStart;
	this.imageLoaded = imageLoaded;
	
	this.mouseX = 0;
	this.mouseY = 0;
			
	this.theCanvas = document.getElementById('canvas');
	this.context = this.theCanvas.getContext('2d');
	console.log("Got context");
	console.log(screen.width, screen.height);
	this.theCanvas.width = screen.width;
	this.theCanvas.height = screen.height;
	this.context.fillStyle = "#FFFFFF";
	this.context.fillRect(0, 0, this.theCanvas.width, this.theCanvas.height);
	
	this.theCanvas.addEventListener("mousemove", onSampMouseMove, false);
	this.theCanvas.addEventListener("click", onSampMouseClick, false);
	this.theCanvas.addEventListener("touchstart", onSampTouchStart, false);
	this.theCanvas.addEventListener("touchmove", onSampTouchMove, false);

	
	function onSampMouseMove(e) {
		theApp.mouseX = e.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = e.clientY - theApp.theCanvas.offsetTop;	      
	}
	
	function onSampMouseClick(e) {
		console.log("click: " + theApp.mouseX + "," + theApp.mouseY);
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = (imageData.data[0] >> 1) | 0x80;
		var green = (imageData.data[1] >> 1) | 0x80;
		var blue = (imageData.data[2] >> 1) | 0x80;
		console.log("color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		currentLight.setlamp(red, green, blue);
	}

	function onSampTouchStart(e) {
		var touch = e.touches[0];
		console.log("onTouchStart", touch.clientX, touch.clientY );
		theApp.mouseX = touch.clientX - theApp.theCanvas.offsetLeft;
		theApp.mouseY = touch.clientY - theApp.theCanvas.offsetTop;
		console.log("touch: " + theApp.mouseX + "," + theApp.mouseY);
		imageData = theApp.context.getImageData(theApp.mouseX,theApp.mouseY,1,1);
		var red = (imageData.data[0] >> 1) | 0x80;
		var green = (imageData.data[1] >> 1) | 0x80;
		var blue = (imageData.data[2] >> 1) | 0x80;
		console.log("color (" + red.toString(16) + ", " + green.toString(16) + ", " + blue.toString(16) + ")")
		currentLight.setlamp(red, green, blue);
		theApp.lastTouch = new Date().getTime();
	}
	
	function onSampTouchMove(e) {
		console.log("onTouchMove");
		event.preventDefault();
		curr = new Date().getTime();
		if ((curr - theApp.lastTouch) > 100) {
			onSampTouchStart(e);
		} else {
			console.log("ignoring");
		}
	}
		
	
	function sampSupport () {
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			return true;
		} else {
			return false;
		}
	}
	
	function sampApp(){
	
		if (sampSupport() == false) {
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
		console.log(theApp.img.width, theApp.img.height);
		console.log(theApp);
	
		theApp.context.fillStyle = "#000000";
		theApp.context.fillRect(0, 0, theApp.theCanvas.width, theApp.theCanvas.height);
		theApp.context.drawImage(theApp.img, 0, 0);
		
	}
}

function handlefiles(tf){
	console.log("handlefiles got ", tf.length, " files");	

	theApp.img = new Image();
	theApp.img.name = "thingy";
	theApp.img.classList.add("obj");
	theApp.img.file = tf[0];
	$(theApp.img).load(theApp.imageLoaded);
	//theApp.img.addEventListener('load', theApp.imageLoaded , false);
	console.log("grabbing ", theApp.img.file);
	 
	var reader = new FileReader();
	reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(theApp.img);
	reader.readAsDataURL(tf[0]);
	while (reader.readyState == false) {
		var x = 1;
	}
	console.log(theApp.img);
	return;
}
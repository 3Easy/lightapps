// sentimental.js - Sentiment analysis driven by the Light
//

// Every app has an object
function sentimental() {

	this.appStart = appStart;
	this.appQuit = appQuit;
	this.running = false;
	this.startbutton = sentimental_startbutton;
	this.stopbutton = sentimental_stopbutton;
	
	function appStart() {
		console.log("sentimental.appStart");
	}
	
	function appQuit() {
		console.log("sentimental.appQuit");
		if (this.running) {
			this.stopbutton();
		}
	}
}

function sentimental_startbutton() {
	var keyword = $("#keyword").val();
	console.log("sentimental_startbutton " + $("#keyword").val());
	currentLight.sendcmdparam("sentimental.sh", "term", keyword);
	/*jQuery.ajax({
		url: 'http://dewey.local/cgi-bin/sentimental.sh', 
		data: { term: keyword }
	});*/
	theApp.running = true;
}

function sentimental_stopbutton() {
	console.log("sentimental_stopbutton");
	currentLight.sendcmd("sentistop.sh");
	theApp.running = false;
}

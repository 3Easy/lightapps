//window.addEventListener('load', eventWindowLoaded, false);	


function book() {

	this.pagecolors = [ 0x9F9F9F, 0x80FF80, 0xFFFF80, 0x8080FF, 0xFF8080, 0x8F8F8F ]
	this.pageRGBs = [ [ 0x80, 0x80, 0x80 ], [ 0xFF, 0x80, 0x80 ], [ 0xFF, 0xFF, 0x80 ],
					[ 0x80, 0x80, 0xFF ], [ 0x80, 0xFF, 0x80 ], [ 0x81, 0x81, 0x81 ] ];

	this.onPage = 0;
	this.maxPage = 5;
	this.lastLight = [ 0x80, 0x80, 0x80 ];

	this.appStart = appStart;
	this.appQuit = appQuit;
	this.loadPage = loadPage;
	this.lightUp = lightUp;
	this.onMouseClick = onMouseClick;
	
	function appStart() {
	
		$("#book_content").bind('click', this.onMouseClick);
		console.log($("#book_content"));
		//$("#content").removeAttr("src").attr("src", "Cover.jpg");
		this.loadPage();
		this.lightUp(this.onPage);
	
	}
	
	function appQuit() {
		currentLight.setlamp(0,0,0);	
	}
	
	function loadPage() {
		fn = "apps/book/" + this.onPage.toString() + ".jpg";
		console.log("loading " + fn);
		$("#book_content").removeAttr("src").attr("src", fn);
	}

	function lightUp(n) {
		currentLight.gradient(this.lastLight[0], this.lastLight[1], this.lastLight[2], 
						this.pageRGBs[n][0], this.pageRGBs[n][1], this.pageRGBs[n][2], 25);
		this.lastLight[0] = this.pageRGBs[n][0];
		this.lastLight[1] = this.pageRGBs[n][1];
		this.lastLight[2] = this.pageRGBs[n][2];
	}

	function onMouseClick(e) {
		console.log("onMouseClick", e.clientX, e.clientY);
		console.log(theApp.onPage);
		
		// Assuming page width of 980 here
		// If less than 440, go back, otherwise go forward
		// How do we get the page width?
		var w = $("#book_content").parent().parent().parent().width();
		console.log("image width is " + w);
		if (e.clientX < w/2) {
			if (theApp.onPage > 0) {
				console.log("backward");
				theApp.onPage = theApp.onPage - 1;	
				theApp.loadPage();
				theApp.lightUp(theApp.onPage);
			}
		} else {
			if (theApp.onPage < theApp.maxPage) {
				console.log("forward");
				theApp.onPage = theApp.onPage + 1;	
				theApp.loadPage();
				theApp.lightUp(theApp.onPage);
			}
		}
	}
}
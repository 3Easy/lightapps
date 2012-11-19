window.addEventListener('load', eventWindowLoaded, false);	

function eventWindowLoaded() {

	bookApp();
	
}

function bookApp() {

	$("#content").bind('click', onMouseClick);
	console.log($("#content"));
	//$("#content").removeAttr("src").attr("src", "Cover.jpg");
	loadPage();
	lightUp(onPage);

}

var pagecolors = [ 0x9F9F9F, 0x80FF80, 0xFFFF80, 0x8080FF, 0xFF8080, 0x8F8F8F ]
var pageRGBs = [ [ 0x80, 0x80, 0x80 ], [ 0xFF, 0x80, 0x80 ], [ 0xFF, 0xFF, 0x80 ],
					[ 0x80, 0x80, 0xFF ], [ 0x80, 0xFF, 0x80 ], [ 0x81, 0x81, 0x81 ] ];

var onPage = 0;
var maxPage = 5;
var lastLight = [ 0x80, 0x80, 0x80 ];
var light = new Light("dewey.local");

function loadPage() {
	fn = "apps/book/" + onPage.toString() + ".jpg";
	$("#content").removeAttr("src").attr("src", fn);
}

function lightUp(n) {
	/*endColor = "0x" + pagecolors[n].toString(16)
	jQuery.ajax({
			url: 'http://dewey.local/cgi-bin/gradiencgi', 
			data: { b: lastLight,
					e: endColor,
					s: "25" }
	});*/
	light.gradient(lastLight[0], lastLight[1], lastLight[2], 
					pageRGBs[n][0], pageRGBs[n][1], pageRGBs[n][2], 25);
	lastLight[0] = pageRGBs[n][0];
	lastLight[1] = pageRGBs[n][1];
	lastLight[2] = pageRGBs[n][2];

}

function lightDown(n) {
	/*beginColor = "0x" + pagecolors[n].toString(16)
	jQuery.ajax({
			url: 'http://dewey.local/cgi-bin/gradiencgi', 
			data: { b: beginColor,
					e: "0x808080",
					s: "5" }
	});*/
	light.gradient(lastLight[0], lastLight[1], lastLight[2], 0, 0, 0, 5);
}

function onMouseClick(e) {
	console.log("onMouseClick", e.clientX, e.clientY);
	
	// Assuming page width of 980 here
	// If less than 440, go back, otherwise go forward
	if (e.clientX < 440) {
		if (onPage > 0) {
			//lightDown(onPage);
			onPage = onPage - 1;	
			loadPage();
			lightUp(onPage);
		}
	} else {
		if (onPage < maxPage) {
			//lightDown(onPage);
			onPage = onPage + 1;	
			loadPage();
			lightUp(onPage);
		}
	}
}

function onImageLoad(e) {
	console.log("onImageLoad");
}
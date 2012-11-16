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

var onPage = 0;
var maxPage = 5;
var lastLight = "0x808080";

function loadPage() {
	fn = "/apps/book/" + onPage.toString() + ".jpg";
	$("#content").removeAttr("src").attr("src", fn);
}

function lightUp(n) {
	endColor = "0x" + pagecolors[n].toString(16)
	jQuery.ajax({
			url: '/cgi-bin/gradiencgi', 
			data: { b: lastLight,
					e: endColor,
					s: "25" }
	});
	lastLight = endColor;
}

function lightDown(n) {
	beginColor = "0x" + pagecolors[n].toString(16)
	jQuery.ajax({
			url: '/cgi-bin/gradiencgi', 
			data: { b: beginColor,
					e: "0x808080",
					s: "5" }
	});
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
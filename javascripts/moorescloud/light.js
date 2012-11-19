// JavasScript library for the Light by MooresCloud
//
// Simple object definitions to make it easy to use the Light from Javascript
// REQUIRES JQuery - so make sure you have included it!
//

// Constructor method for the light
// Requires a string 'address' (i.e. IP address 192.168.0.20) or resolvable name (i.e. 'light.local')
// If no address passed then it uses relative URLs -- which will often be the case.
//
function Light(address) {
	this.address = address;
	if (address.length > 0) {
		this.urlbase = "http://" + this.address;
	} else {
		this.urlbase = "";
	}
	this.rgbtocolor = rgbtocolor;
	this.setlamp = setlamp;
	this.gradient = gradient;
	this.sendcmd = sendcmd;

	function rgbtocolor(r, g, b) {
	
		redstr = r.toString(16);
		if (redstr.length < 2) {
			redstr = "0" + redstr;
		}
		greenstr = g.toString(16);
		if (greenstr.length < 2) {
			greenstr = "0" + greenstr;
		}
		bluestr = b.toString(16);
		if (bluestr.length < 2) {
			bluestr = "0" + bluestr;
		}	
		return "0x" + greenstr + redstr + bluestr;
	}

	// Set the whole lamp to a single color
	function setlamp(r, g, b) {
		$.ajax({
			url: this.urlbase + '/cgi-bin/ajaxcolor', 
			data: {color: rgbtocolor(r, g, b) }
		});
	}

	// Run a gradient from the start color to the end color
	// Steps are measured in 1/50th of a second
	function gradient(startR, startG, startB, endR, endG, endB, steps) {
		console.log(startR, startG, startB, endR, endG, endB, steps);
		$.ajax({
			url: this.urlbase + '/cgi-bin/gradiencgi', 
			data: { b: rgbtocolor(startR, startG, startB),
					e: rgbtocolor(endR, endG, endB),
					s: steps }
		});	
	}

	// Issue some sort of command via cgi-bin
	// This is potentially hugely unsafe.  Possibly.
	function sendcmd(cmdname) {
		$.ajax({
			url: this.urlbase + '/cgi-bin/' + cmdname		
		});
	}
}


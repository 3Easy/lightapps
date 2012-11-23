// JavasScript library for the Light by MooresCloud
//
// Simple object definitions to make it easy to use the Light from Javascript
// REQUIRES JQuery - so make sure you have included it!
//

// Constructor method for the light
// Requires a string 'address' (i.e. IP address 192.168.0.20) or resolvable name (i.e. 'light.local')
function Light(address) {
	this.address = address;
	if (address.length == 0) {
		this.urlbase = "";
	} else {
		this.urlbase = "http://" + this.address;
	}
	
	this.rgbtocolor = rgbtocolor;
	this.rgb2hex = rgb2hex;
	this.setlamp = setlamp;
	this.gradient = gradient;
	this.sendcmd = sendcmd;
	this.sendcmdparam = sendcmdparam;
	this.setlights = setlights;
	this.setbulb = setbulb;
	this.bulbs = [ "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", 
					"#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", 
					"#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", 
					"#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", 
					"#808080", "#808080", "#808080", "#808080", 
					"#808080", "#808080", "#808080", "#808080", 
					"#808080", "#808080", "#808080", "#808080", 
					"#808080", "#808080", "#808080", "#808080" ];
 
 	this.fastlights = fastlights;
	this.fastbulbs = [ 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080,
 						0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080,
 						0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080,
 						0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080, 0x808080,
 						0x808080, 0x808080, 0x808080, 0x808080, 
 						0x808080, 0x808080, 0x808080, 0x808080, 
 						0x808080, 0x808080, 0x808080, 0x808080, 
 						0x808080, 0x808080, 0x808080, 0x808080 ];
 	this.fastset = fastset;
 	this.fast2json = fast2json;
 
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

	// Properly
	function rgb2hex(r, g, b) {
	
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
		return "#" + redstr + greenstr + bluestr;
	}

	function setbulb(r, g, b, bulb) {
		this.bulbs[bulb] = this.rgb2hex(r,g,b);
	}

	// Send the current bulb values to the light
	function setlights() {
		var jbulbs = JSON.stringify({ "lights": this.bulbs });
		console.log(jbulbs);
		$.ajax({
			type: "POST",
			url: this.urlbase + '/cgi-bin/setlights.py', 
			data: { lights: jbulbs }
		});
	}

	function fastset(r, g, b, bulb) {
		value = (g << 16) + (r << 8) + b;
		this.fastbulbs[bulb] = value;
	}
	
	// Return the array as correctly formatted JSON
	function fast2json() {
		output = "[ ";
		for (var j = 0; j < this.fastbulbs.length; j++) {
			output = output + this.fastbulbs[j].toString();
			if ((j+1) != this.fastbulbs.length) {
				output = output + ", ";
			}
		}
		output = output + " ]";
		return output;
	}
		
	// Send the current bulb values to the light
	function fastlights() {
		var fbulbs = this.fast2json();
		console.log(fbulbs);
		$.ajax({
			type: "POST",
			processData: false,
			url: this.urlbase + '/cgi-bin/fastlights.sh', 
			data: fbulbs 
		});
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

	// Issue some sort of command via cgi-bin
	// This is potentially hugely unsafe.  Possibly.	
	// With this one, we're sending some datas along
	// Just, you know, to keep things interesting.
	//
	function sendcmdparam(cmdname, paramname, paramval) {
		var kps = "{"+ paramname +":" + paramval + "}";
		console.log(kps);
		var kp = eval("kps");
		console.log(kp);
		$.ajax({
			url: this.urlbase + '/cgi-bin/' + cmdname,	
			data: paramname + "=" + paramval	
		});
	}
}


var blankId = "_16";
var currentMoveable = [];
var count = 0;

var background = "background1.jpg";

function backgroundImg() {
	var val = document.getElementById("selector");
	background = val.options[val.selectedIndex].value;
	for(i=1; i<16; i++) {
		document.getElementById(i).style.backgroundImage = "url('"+background+"')";
		document.getElementById(i).innerHTML = i;
	}
	document.getElementById("_16").innerHTML = 16;
	document.getElementById("_16").style.backgroundImage = "none";
	load();
	blankId = "_16";
	moveable();
}

function moveable() {
	if(count != 0) {
		for(i=0; i<currentMoveable.length; i++) {
			var val = currentMoveable[i];
			if(val == 16) val = "_16";
			document.getElementById(val).classList.remove("moveable");
		}
		currentMoveable = [];
		count = 0;
	}
	
	var id = blankId;
	if(id == "_16") id = 16;
	
	if(id <= 12) {
		currentMoveable[count] = id+4;
		count++;
	}
	
	if(id > 4) {
		currentMoveable[count] = id-4;
		count++;
	}
	
	if((id%4) != 0) {
		currentMoveable[count] = id+1;
		count++;	
	}
	
	if((id%4) != 1) {
		currentMoveable[count] = id-1;
		count++;
	}
		
	for(i=0; i<currentMoveable.length; i++) {
		var val = currentMoveable[i];
		if(val == 16) val = "_16";
		document.getElementById(val).classList.add("moveable");
	}
}

function load() {
	var x = 0;
	
	for(i=1; i<=15; i++) {
		var y;
			
		if(i==1) {
			y = 0;
		}	
			
		if(i==5) {
			y = -100;
		}
		
		if(i==9) {
			y = -200;
		}
		
		if(i==13) {
			y = -300;
		}

		var val = x+"px "+y+"px";
		document.getElementById(i).style.backgroundPosition = val;
		
		x = x-100;
		if (x==-400) {
			x=0;
		}
	}
	moveable();
}

function findBlankNeighbor(id) {
	var south;
	var north;
	var east;
	var west;
	
	if(id <= 12) {
		south = id+4;
		if (south == 16) south = "_16";
		if (document.getElementById(south).innerHTML == "16") {
			return south;
		}
	}
	
	if(id > 4) {
		north = id-4;
		if (north == 16) north = "_16";
		if (document.getElementById(north).innerHTML == "16") {
			return north;
		}
	}
	
	if((id%4) != 0) {
		east = id+1;
		if (east == 16) east = "_16";
		if (document.getElementById(east).innerHTML == "16") {
			return east;
		}		
	}
	
	if((id%4) != 1) {
		west = id-1;
		if (west == 16) west = "_16";
		if (document.getElementById(west).innerHTML == "16") {
			return west;
		}
	}
	
	return 0;
}

function swap(id) {
	if(id == 16) id = "_16";
	
	var idVal = document.getElementById(id).innerHTML;
	var idBkgrd = document.getElementById(id).style.backgroundPosition;
	
	document.getElementById(id).innerHTML = "16";
	document.getElementById(id).style.backgroundImage = "none";
	document.getElementById(id).style.backgroundColor = "white";
	
	document.getElementById(blankId).innerHTML = idVal;
	document.getElementById(blankId).style.backgroundImage = "url('"+background+"')";
	document.getElementById(blankId).style.backgroundPosition = idBkgrd;
	
	blankId = id;
	moveable();
}

function play(id) {
	blankId = findBlankNeighbor(id);
	if(blankId != 0) {
		swap(id);
	}
}

function shuffle() {
	if(blankId == "_16") blankId = 16;
	var options = [-4, -1, 1, 4];
	var numShuffled = 0;
	while(numShuffled < 100) {
		var rand = Math.floor(Math.random()*4)+0;
		var newId = blankId + options[rand];
		if (1<=newId && newId<=16) {
			play(newId);
			blankId = newId;
			numShuffled++;
		}
	}
}
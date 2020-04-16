//set up ctx and drawing and size stuff
var canvas = el("canvas");
var ctx = canvas.getContext('2d');
var width = window.innerWidth - 20;
var height = window.innerHeight - 100;
canvas.width = width;
canvas.height = height;

var intervals = [];
var characters = [];
var drawCharactersVar = setInterval(drawCharacters,50);
var mouse = {x: 0, y: 0};
var ask = prompt;

var mathFunctions = Object.getOwnPropertyNames(Math);
for (var i = 0; i < mathFunctions.length; i++) {
	window[mathFunctions[i]] = Math[mathFunctions[i]]; //make all of the math functions global
}
document.body.onmousemove = function(){
	mouse.x = event.clientX-width/2 - 8;
	mouse.y = height/2 - event.clientY + 34;
}
function drawCharacters(){
	ctx.clearRect(0,0,width,height);
	for (var i = 0; i < characters.length; i++) {
		if(characters[i].hidden == false){
			characters[i].draw();
		}
	}
}

//functions
function el(id){
  return document.getElementById(id);
}
function range(start,end,distance=1){
	var toReturn = [];
	for (var i = start; i <= end; i+=distance) {
		toReturn.push(i);
	}
	return toReturn;
}

//loops
function forEach(listOfValues, toRun){
	for (var i = 0; i < listOfValues.length; i++) {
		toRun(listOfValues[i]);
	}
}
function repeatEvery(seconds,toRepeat){
	var newInterval = setInterval(function(){
		toRepeat(intervals.length);
	},seconds*1000);
	intervals.push(newInterval);
}
function wait(seconds,toRepeat){
	var newInterval = setTimeout(function(){
		toRepeat(intervals.length);
	},seconds*1000);
}
function when(whenHappen,toHappen){
	if(whenHappen == "click"){
		document.body.addEventListener("mousedown",toHappen);
	}else if(whenHappen == "drag"){
		document.body.addEventListener("mousedown",function(){
			toHappen();
			document.body.addEventListener("mousemove",toHappen);
			document.body.addEventListener("mouseup",function(){
				document.body.removeEventListener("mousemove", toHappen);
			})
		});
	}else if(whenHappen == "click end"){
		document.body.addEventListener("mouseup",toHappen);
	}else if(whenHappen.slice(-8,whenHappen.length) == " pressed"){
		var key = whenHappen.slice(0,-8);
		var alphabet = "abcdefghijklmnopqrstuvwxyz";
		document.body.addEventListener("keydown",function(){
			var keycode = event.keyCode;
			if(alphabet.includes(key)){
				if(String.fromCharCode(keycode).toLowerCase() == key){
					toHappen();
				}
			}else if(key == "left"){
				if(keycode == 37){toHappen();}
			}else if(key == "right"){
				if(keycode == 39){toHappen();}
			}else if(key == "up"){
				if(keycode == 38){toHappen();}
			}else if(key == "down"){
				if(keycode == 40){toHappen();}
			}else if(key == "key"){
				toHappen();
			}else if(key == "space"){
				if(keycode == 32){toHappen();}
			}else{
				console.error('"'+key+'"'+" isn't a recognized key. Make sure there isn't any space around the key and see the when loops section of the help page for more.");
			}
		})
	}else{
		console.error('"'+whenHappen+'"'+" isn't a recognized event. Make sure there isn't any space around the key and see the when loops section of the help page for more.");
	}
}

//THESE FUNCTIONS CAN ONLY BE USED WHEN DRAWING A CHARACTER:
function rect(char,xPos,yPos,rwidth,rheight,color="black",borderWidth=0,borderColor="black"){
	if(typeof xPos == "number" && typeof yPos == "number" && typeof rheight == "number" && typeof rwidth == "number"){
		ctx.fillStyle = color;
		if(color != "clear"){
			ctx.fillRect(width/2+char.x+xPos,height/2-char.y-yPos,rwidth,rheight);
		}
		if(borderWidth != 0){
			ctx.strokeStyle = borderColor;
			ctx.lineWidth = borderWidth;
			ctx.strokeRect(width/2+char.x+xPos,height/2-char.y-yPos,rwidth,rheight);
		}
	}else{
		console.error(`Make sure the x-position, y-position, width, and height are numbers when drawing the rectangle. Right now, 
	xPos: `+xPos+` (`+ typeof xPos+`)
	yPos: `+yPos+` (`+ typeof yPos+`)
	width: `+rwidth+` (`+ typeof rwidth+`)
	height: `+rheight+` (`+ typeof rheight+`)`
		);
	}
}
function oval(char,centX,centY,radiusX,radiusY,color="black",borderWidth=0,borderColor="black"){
	if(typeof centX == "number" && typeof centY == "number" && typeof radiusX == "number" && typeof radiusY == "number"){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = borderColor;
		ctx.ellipse(width/2+char.x+centX,height/2-char.y-centY,radiusX,radiusY,0,0,2*Math.PI);
		if(color != "clear"){
			ctx.fill();
		}
		if(borderWidth != 0){
			ctx.lineWidth = borderWidth;
			ctx.stroke();
		}
	}else{
		console.error(`Make sure the x-position, y-position, radiusX, and radiusY are numbers when drawing the oval. Right now, 
	xPos: `+centX+` (`+ typeof centX+`)
	yPos: `+centY+` (`+ typeof centY+`)
	radiusX: `+radiusX+` (`+ typeof radiusX+`)
	radiusY: `+radiusY+` (`+ typeof radiusY+`)`
		);
	}
}
function circle(char,centX,centY,radius,color="black",borderWidth=0,borderColor="black"){
	if(typeof centX == "number" && typeof centY == "number" && typeof radius == "number"){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.strokeStyle = borderColor;
		ctx.ellipse(width/2+char.x+centX,height/2-char.y-centY,radius,radius,0,0,2*Math.PI);
		if(color != "clear"){
			ctx.fill();
		}
		if(borderWidth != 0){
			ctx.lineWidth = borderWidth;
			ctx.stroke();
		}
	}else{
		console.error(`Make sure the x-position, y-position, and radius are numbers when drawing the circle. Right now, 
	xPos: `+centX+` (`+ typeof centX+`)
	yPos: `+centY+` (`+ typeof centY+`)
	radius: `+radius+` (`+ typeof radius+`)`
		);
	}
}
function text(char,toSay, xPos, yPos, color="black", size=30){
	if(typeof xPos == "number" && typeof yPos == "number"){
		ctx.fillStyle = color;
		ctx.font = size+"px Arial";
		ctx.textAlign = "center"; 
		ctx.fillText(toSay, width/2+char.x+xPos, height/2-char.y-yPos);
	}else{
		console.error(`Make sure the x-position and y-position are numbers when drawing the text. Right now, 
	xPos: `+xPos+` (`+ typeof xPos+`)
	yPos: `+yPos+` (`+ typeof yPos+`)`
		);
	}
}
function polygon(char,points,color="black",borderWidth=1,borderColor="black"){
	ctx.strokeStyle = borderColor;
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(points[0]+char.x+width/2,height/2-char.y-points[1]);
	for (var i = 2; i < points.length; i+=2) {
		ctx.lineTo(points[i]+char.x+width/2,height/2-char.y-points[i+1]);
	}
	ctx.moveTo(points[0]+char.x+width/2,height/2-char.y-points[1]);
	ctx.fill();
	if(borderWidth != 0){
		ctx.lineWidth = borderWidth;
		ctx.stroke();
	}
}
function line(char,x1,y1,x2,y2,color="black",borderWidth=1,borderColor="black"){
	if(typeof x1 == "number" && typeof y1 == "number" && typeof x2 == "number" && typeof y2 == "number"){
		ctx.beginPath();
		ctx.moveTo(x1+char.x+width/2,height/2-char.y-y1);
		ctx.lineTo(x2+char.x+width/2,height/2-char.y-y2);
		if(color != "clear"){
			ctx.fillStyle = color;
			ctx.fill();
		}
		if(borderWidth != 0){
			ctx.strokeStyle = borderColor;
			ctx.lineWidth = borderWidth;
			ctx.stroke();
		}
	}else{
		console.error(`Make sure the x-positions and y-positions are numbers when drawing the line. Right now, 
	x1: `+x1+` (`+ typeof x1+`)
	y1: `+y1+` (`+ typeof y1+`)
	x2: `+x2+` (`+ typeof x2+`)
	y2: `+y2+` (`+ typeof y2+`)`
		);
	}
}

class character{
	constructor(){
		characters.push(this);
		this.hidden = false;
		this.x = 0;
		this.y = 0;
	}
	moveInDirection(angle, distance){
		this.x += distance*Math.cos(angle*Math.PI/180);
		this.y += distance*Math.sin(angle*Math.PI/180);
	}
	distanceTo(otherObject){
		var distanceX = this.x - otherObject.x;
		var distanceY = this.y - otherObject.y;
		return Math.hypot(distanceX,distanceY);
	}
	delete(){
		var properties = Object.keys(this);
		for (var i = 0; i < characters.length; i++) {
			var same = false;
			if(Object.keys(characters[i]).length == Object.keys(this).length){
				same = true;
				for (var x in properties) {
					var key = properties[x];
					if(characters[i][key] != this[key]){
						same = false;
					}
				}
			}
			if(same){
				//delete all of this.
				for(var x in properties){
					delete this[properties[x]];
				}
				return undefined;
			}
		}
		console.error("Unable to delete. Make sure that what you are deleting is an actual character.");
	}
}
class Rectangle extends character{
	constructor(){
		super();
		this.width = 100;
		this.height = 100;
		this.color = "#0CF";
		this.borderWidth = 0;
		this.borderColor = "#004B59";
	}
	draw(){
		rect(this,0,0,this.width,this.height,this.color,this.borderWidth,this.borderColor);
	}
	copy(){
		var copyOfMe = new Rectangle;
		var myProperties = Object.keys(this);
		for (var i = 0; i < myProperties.length; i++) {
			copyOfMe[myProperties[i]] = this[myProperties[i]];
		}
		characters.push(copyOfMe);
		return copyOfMe;
	}
}
class Circle extends character{
	constructor(){
		super();
		this.radius = 100;
		this.color = "#0CF";
		this.borderWidth = 0;
		this.borderColor = "#004B59";
	}
	draw(){
		oval(this,0,0,this.radius,this.radius,this.color,this.borderWidth,this.borderColor);
	}
	copy(){
		var copyOfMe = new Circle;
		var myProperties = Object.keys(this);
		for (var i = 0; i < myProperties.length; i++) {
			copyOfMe[myProperties[i]] = this[myProperties[i]];
		}
		characters.push(copyOfMe);
		return copyOfMe;
	}
}
class Text extends character{
	constructor(){
		super();
		this.text = "no text right now";
		this.color = "black";
		this.size = 30;
	}
	draw(){
		text(this,this.text,0,0,this.color,this.size);
	}
	copy(){
		var copyOfMe = new Text;
		var myProperties = Object.keys(this);
		for (var i = 0; i < myProperties.length; i++) {
			copyOfMe[myProperties[i]] = this[myProperties[i]];
		}
		characters.push(copyOfMe);
		return copyOfMe;
	}
}
class Custom extends character{
	constructor(){
		super();
		this.instructions = function(){
			console.error("You need to write how to draw your character. Use \n\ncharacter.instructions = \n|...\n|...");
		}
	}
	draw(){
		this.instructions(this);
	}
	copy(){
		var copyOfMe = new Custom;
		var myProperties = Object.keys(this);
		for (var i = 0; i < myProperties.length; i++) {
			copyOfMe[myProperties[i]] = this[myProperties[i]];
		}
		characters.push(copyOfMe);
		return copyOfMe;
	}
}
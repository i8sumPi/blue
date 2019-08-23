var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
//set up ctx and drawing and size stuff
var ctx = canvas.getContext('2d');
var width = window.innerWidth - 20;
var height = window.innerHeight - 100;
var foreverLoops = [];
var characters = [];
var mouseX = 0;
var mouseY = 0;
var mouse = {x:mouseX, y:mouseY};
canvas.width = width;
canvas.height = height;
canvas.style.display = "none";
document.body.onmousemove = function(){
	mouseX = event.clientX - width/2 - 5;
	mouseY = height/2 - event.clientY + 19;
	mouse.x = mouseX;
	mouse.y = mouseY;
}
function createCanvas(){
	ctx.clearRect(0,0,width,height);
	canvas.style.display = "block";
}
function hideCanvas(){
	canvas.style.display = "none";
}
function changeScreenSize(newWidth,newHeight){
	width = newWidth;
	height = newHeight;
	canvas.width = width;
	canvas.height = height;
}
function after(toWait,toRun){
	setTimeout(toRun,toWait*1000);
}
function forever(toRun){
	foreverLoops.push(setInterval(toRun,30));
}
function clear(){
	ctx.clearRect(0,0,width,height);
}
function clearAllForevers(){
	clearInterval(drawCharacters);
	for (var i = 0; i < foreverLoops.length; i++) {
		clearInterval(foreverLoops[i]);
	}
}
function when(whenHappen,toHappen){
	if(whenHappen == "click"){
		document.body.onmousedown = toHappen;
	}else if(whenHappen == "mouse down"){
		document.body.onmousedown = function(){
			document.body.addEventListener("mousemove",toHappen);
			document.body.addEventListener("mouseup",function(){
				document.body.removeEventListener("mousemove", toHappen);
			})
		}
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
				console.log("you didn't enter a recognised letter or thing to see if pressed. See recognised letters in ENTER GITHUB WIKI PAGE ON THIS.");
			}
		})
	}else{
		console.log("your when statement doesn't include the correct event.");
	}
}
function log(toWrite){
	console.log(toWrite);
}
var background = function(){}
var drawCharacters = setInterval(function(){
	ctx.clearRect(0,0,width,height);
	background();
	for (var i = 0; i < characters.length; i++) {
		characters[i].draw();
	}
},30);

function repeat(times,toRun){
	for (var i = 0; i < times; i++) {
		toRun();
	}
}
//THESE FUNCTIONS CAN ONLY BE USED WHEN DRAWING A CHARACTER:
function rect(xPos,yPos,rwidth,rheight,color="black",borderWidth=1,borderColor="black"){
	ctx.fillStyle = color;
	ctx.fillRect(width/2+xPos-rwidth/2,height/2-yPos-(rheight/2),rwidth,rheight);
	if(borderWidth != 0){
		ctx.strokeStyle = borderColor;
		ctx.lineWidth = borderWidth;
		ctx.strokeRect(width/2+xPos-rwidth/2,height/2-yPos-(rheight/2),rwidth,rheight);
	}
}
function circle(centX,centY,radius,color="black",borderWidth=1,borderColor="black"){
	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.strokeStyle = borderColor;
	ctx.arc(width/2+centX,height/2-centY,radius,0,2*Math.PI);
	ctx.fill();
	if(borderWidth != 0){
		ctx.lineWidth = borderWidth;
		ctx.stroke();
	}
}
function text(toSay, xPos, yPos, color="black", size=30){
	ctx.fillStyle = color;
	ctx.font = size+"px Arial";
	ctx.textAlign = "center"; 
	ctx.fillText(toSay, width/2+xPos, height/2-yPos);
}
function polygon(points,color="black",borderWidth=1,borderColor="black"){
	ctx.strokeStyle = borderColor;
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.moveTo(points[0]+width/2,height/2-points[1]);
	for (var i = 2; i < points.length; i+=2) {
		ctx.lineTo(points[i]+width/2,height/2-points[i+1]);
	}
	ctx.fill();
	if(borderWidth != 0){
		ctx.lineWidth = borderWidth;
		ctx.stroke();
	}
}

class character{
	constructor(param){
		var properties = Object.getOwnPropertyNames(param);
		for (var i = 0; i < properties.length; i++) {
			this[properties[i]] = param[properties[i]];
		}
		this.hidden = false;
		characters.push(this);
	}
	hide(){
		this.hidden = true;
	}
	show(){
		this.hidden = false;
	}
	draw(){
		this.code(this.x,this.y);
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
}
class characterFromImage{
	constructor(param){
		console.log("comming soon");
	}
}
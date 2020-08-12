var currentProject;

el("codeHighlight").style.minHeight = window.innerHeight-70 + "px";
el("codeHighlight").style.minWidth = window.innerWidth-90 + "px";
el("lineNums").style.height = el("codeHighlight").style.height;
var demoCode = `//create circle one, which is green\nvar circle1 = new Circle();\ncircle1.color = "clear";\ncircle1.borderColor = "#1DEB66";\ncircle1.borderWidth = 20;\n\n//create circles 2,3,4 from circle 1\nvar circle2 = circle1.copy();\ncircle2.borderColor = "#1D3BEB";\nvar circle3 = circle1.copy();\ncircle3.borderColor = "#EB1DA2";\nvar circle4 = circle1.copy();\ncircle4.borderColor = "#EBCD1D";\n\n//every moment, change where the circles are a bit.\nvar time = 0;\nvar speed = 0.025;\nforever:\n|//mathy stuff that makes it look cool!\n|circle1.radius = abs(sin(time))*300;\n|circle2.radius = abs(sin(time+0.2))*300;\n|circle3.radius = abs(sin(time+0.4))*300;\n|circle4.radius = abs(sin(time+0.6))*300;\n|time += speed`;
function createLines(number){
	var lines = 0;
	for (var i = 1; i < number; i++) {
		lines = lines + i+"<br>";
	}
	el("lineNums").innerHTML = lines;
}

el("code").onkeydown = function(){
	setTimeout(keyPressed, 10, event);
};
el("code").onkeypress = function(){
	if(this.selectionStart == this.selectionEnd){
		if(event.keyCode == 123){
			addBracket(this, "}");
		}else if(event.keyCode==40){
			addBracket(this, ")");
		}else if(event.keyCode==91){
			addBracket(this, "]");
		}else if(event.keyCode==34){
			addBracket(this, '"');
		}else if(event.keyCode==13){
			var thisLine = this.value.slice(0,this.selectionStart).split("\n");
			thisLine = thisLine[thisLine.length-1];
			var addToStart = ""
			for(var i in thisLine){
				if(thisLine[i] == "|"){
					addToStart += "|";
				}else{
					break;
				}
			}
			//beginning of a loop:
			if(beginsWith(thisLine.slice(addToStart.length),["when","if","else","forever","repeatEvery","forEach","wait"])){
				addToStart += "|";
			}
			if(thisLine.slice(addToStart.length).split(".").length>1 && thisLine.slice(addToStart.length).split(".")[1].slice(0,12)=="instructions"){
				addToStart += "|";
			}
			event.preventDefault();
			document.execCommand("insertText",true,"\n"+addToStart);
		}
	}
}
function beginsWith(text, checkIfIncludes){
	for (var i = 0; i < checkIfIncludes.length; i++) {
		if(text.slice(0,checkIfIncludes[i].length) == checkIfIncludes[i]){
			return true;
		}
	}
	return false;
}
function addBracket(textbox,bracket){
	var selSt = textbox.selectionStart;
	textbox.value = textbox.value.slice(0,textbox.selectionStart)+bracket+textbox.value.slice(textbox.selectionStart);
	textbox.selectionStart = selSt;
	textbox.selectionEnd = selSt;
}
el("code").onmouseup = keyPressed;
function keyPressed(ev){
	if(el("code").value.indexOf("	") != -1){
		el("code").value = el("code").value.split("	").join("");
	}
	updateHighlight();
	save();
}

function updateHighlight(){
	//get rid of any scrolls
	var longestLine = 0;
	for (var i = 0; i < el("code").value.split("\n").length; i++) {
		if(el("code").value.split("\n")[i].length > longestLine){
			longestLine = el("code").value.split("\n")[i].length;
		}
	}
	el("code").style.width = (longestLine+2) + "ch";
	el("code").style.height = 13.33333*1.15*(el("code").value.split("\n").length+1) + "px";

	el("codeHighlight").style.width = (longestLine+3) + "ch";
	if(longestLine == 0 && el("code").value.split("\n").length == 1){
		el("code").style.width = "193px";
		el("code").style.height = "49px";
	}
	createLines(el("code").value.split("\n").length+1);
	el("codeHighlight").innerHTML = highlight(el("code").value);
}
updateHighlight();

function exportToWebsite(){
	var libraryScriptMin = `var canvas=el("canvas"),ctx=canvas.getContext("2d"),width=window.innerWidth-20,height=window.innerHeight-100;canvas.width=width,canvas.height=height;for(var intervals=[],characters=[],drawCharactersVar=setInterval(drawCharacters,50),mouse={x:0,y:0},ask=prompt,mathFunctions=Object.getOwnPropertyNames(Math),i=0;i<mathFunctions.length;i++)window[mathFunctions[i]]=Math[mathFunctions[i]];function drawCharacters(){ctx.clearRect(0,0,width,height);for(var t=0;t<characters.length;t++)0==characters[t].hidden&&characters[t].draw()}function el(t){return document.getElementById(t)}function range(t,e,r=1){for(var n=[],o=t;o<=e;o+=r)n.push(o);return n}function forEach(t,e){for(var r=0;r<t.length;r++)e(t[r])}function repeatEvery(t,e){var r=setInterval(function(){e(intervals.length)},1e3*t);intervals.push(r)}function wait(t,e){setTimeout(function(){e(intervals.length)},1e3*t)}function when(t,e){if("click"==t)document.body.addEventListener("mousedown",e);else if("drag"==t)document.body.addEventListener("mousedown",function(){e(),document.body.addEventListener("mousemove",e),document.body.addEventListener("mouseup",function(){document.body.removeEventListener("mousemove",e)})});else if("click end"==t)document.body.addEventListener("mouseup",e);else if(" pressed"==t.slice(-8,t.length)){var r=t.slice(0,-8);document.body.addEventListener("keydown",function(){var t=event.keyCode;"abcdefghijklmnopqrstuvwxyz".includes(r)?String.fromCharCode(t).toLowerCase()==r&&e():"left"==r?37==t&&e():"right"==r?39==t&&e():"up"==r?38==t&&e():"down"==r?40==t&&e():"key"==r?e():"space"==r?32==t&&e():console.error('"'+r+" isn't a recognized key. Make sure there isn't any space around the key and see the when loops section of the help page for more.")})}else console.error('"'+t+" isn't a recognized event. Make sure there isn't any space around the key and see the when loops section of the help page for more.")}function rect(t,e,r,n,o,i="black",s=0,h="black"){"number"==typeof e&&"number"==typeof r&&"number"==typeof o&&"number"==typeof n?(ctx.fillStyle=i,"clear"!=i&&ctx.fillRect(width/2+t.x+e,height/2-t.y-r,n,o),0!=s&&(ctx.strokeStyle=h,ctx.lineWidth=s,ctx.strokeRect(width/2+t.x+e,height/2-t.y-r,n,o))):console.error("Make sure the x-position, y-position, width, and height are numbers when drawing the rectangle. Right now, xPos: "+e+" ("+typeof e+")yPos: "+r+" ("+typeof r+")width: "+n+" ("+typeof n+") height: "+o+" ("+typeof o+")")}function oval(t,e,r,n,o,i="black",s=0,h="black"){"number"==typeof e&&"number"==typeof r&&"number"==typeof n&&"number"==typeof o?(ctx.beginPath(),ctx.fillStyle=i,ctx.strokeStyle=h,ctx.ellipse(width/2+t.x+e,height/2-t.y-r,n,o,0,0,2*Math.PI),"clear"!=i&&ctx.fill(),0!=s&&(ctx.lineWidth=s,ctx.stroke())):console.error("Make sure the x-position, y-position, radiusX, and radiusY are numbers when drawing the oval. Right now, xPos: "+e+" ("+typeof e+") yPos: "+r+" ("+typeof r+") radiusX: "+n+" ("+typeof n+") radiusY: "+o+" ("+typeof o+")")}function circle(t,e,r,n,o="black",i=0,s="black"){"number"==typeof e&&"number"==typeof r&&"number"==typeof n?(ctx.beginPath(),ctx.fillStyle=o,ctx.strokeStyle=s,ctx.ellipse(width/2+t.x+e,height/2-t.y-r,n,n,0,0,2*Math.PI),"clear"!=o&&ctx.fill(),0!=i&&(ctx.lineWidth=i,ctx.stroke())):console.error("Make sure the x-position, y-position, and radius are numbers when drawing the circle. Right now, xPos: "+e+" ("+typeof e+") yPos: "+r+" ("+typeof r+") radius: "+n+" ("+typeof n+")")}function text(t,e,r,n,o="black",i=30){"number"==typeof r&&"number"==typeof n?(ctx.fillStyle=o,ctx.font=i+"px Arial",ctx.textAlign="center",ctx.fillText(e,width/2+t.x+r,height/2-t.y-n)):console.error("Make sure the x-position and y-position are numbers when drawing the text. Right now, xPos: "+r+" ("+typeof r+") yPos: "+n+" ("+typeof n+")")}function polygon(t,e,r="black",n=1,o="black"){ctx.strokeStyle=o,ctx.fillStyle=r,ctx.beginPath(),ctx.moveTo(e[0]+t.x+width/2,height/2-t.y-e[1]);for(var i=2;i<e.length;i+=2)ctx.lineTo(e[i]+t.x+width/2,height/2-t.y-e[i+1]);ctx.moveTo(e[0]+t.x+width/2,height/2-t.y-e[1]),ctx.fill(),0!=n&&(ctx.lineWidth=n,ctx.stroke())}function line(t,e,r,n,o,i="black",s=1,h="black"){"number"==typeof e&&"number"==typeof r&&"number"==typeof n&&"number"==typeof o?(ctx.beginPath(),ctx.moveTo(e+t.x+width/2,height/2-t.y-r),ctx.lineTo(n+t.x+width/2,height/2-t.y-o),"clear"!=i&&(ctx.fillStyle=i,ctx.fill()),0!=s&&(ctx.strokeStyle=h,ctx.lineWidth=s,ctx.stroke())):console.error("Make sure the x-positions and y-positions are numbers when drawing the line. Right now, x1: "+e+" ("+typeof e+") y1: "+r+" ("+typeof r+") x2: "+n+" ("+typeof n+") y2: "+o+" ("+typeof o+")")}document.body.onmousemove=function(){mouse.x=event.clientX-width/2-8,mouse.y=height/2-event.clientY+34};class character{constructor(){characters.push(this),this.hidden=!1,this.x=0,this.y=0}moveInDirection(t,e){this.x+=e*Math.cos(t*Math.PI/180),this.y+=e*Math.sin(t*Math.PI/180)}distanceTo(t){var e=this.x-t.x,r=this.y-t.y;return Math.hypot(e,r)}delete(){for(var t=Object.keys(this),e=0;e<characters.length;e++){var r=!1;if(Object.keys(characters[e]).length==Object.keys(this).length)for(var n in r=!0,t){var o=t[n];characters[e][o]!=this[o]&&(r=!1)}if(r){for(var n in t)delete this[t[n]];return}}console.error("Unable to delete. Make sure that what you are deleting is an actual character.")}}class Rectangle extends character{constructor(){super(),this.width=100,this.height=100,this.color="#0CF",this.borderWidth=0,this.borderColor="#004B59"}draw(){rect(this,0,0,this.width,this.height,this.color,this.borderWidth,this.borderColor)}copy(){for(var t=new Rectangle,e=Object.keys(this),r=0;r<e.length;r++)t[e[r]]=this[e[r]];return characters.push(t),t}}class Circle extends character{constructor(){super(),this.radius=100,this.color="#0CF",this.borderWidth=0,this.borderColor="#004B59"}draw(){oval(this,0,0,this.radius,this.radius,this.color,this.borderWidth,this.borderColor)}copy(){for(var t=new Circle,e=Object.keys(this),r=0;r<e.length;r++)t[e[r]]=this[e[r]];return characters.push(t),t}}class Text extends character{constructor(){super(),this.text="no text right now",this.color="black",this.size=30}draw(){text(this,this.text,0,0,this.color,this.size)}copy(){for(var t=new Text,e=Object.keys(this),r=0;r<e.length;r++)t[e[r]]=this[e[r]];return characters.push(t),t}}class Custom extends character{constructor(){super(),this.instructions=function(){console.error(\`You need to write how to draw your character. Use \ncharacter.instructions = \n|...\n|...\`)}}draw(){this.instructions(this)}copy(){for(var t=new Custom,e=Object.keys(this),r=0;r<e.length;r++)t[e[r]]=this[e[r]];return characters.push(t),t}}`;
	setTimeout(function(){
		var code = `<!DOCTYPE html>
	<html>
	<head>
		<title>Blue</title>
	</head>
	<body>
		<canvas id="canvas"></canvas>

		<!-- Blue's source code -->
		<script>`+libraryScriptMin+`</script>

		<!--Your code, as JavaScript-->
		<script>
			`+convertScript(el("code").value)+`
		</script>
	</body>
	</html>`
		var copy = el("copy");
		copy.value = code;
		copy.select();
		document.execCommand("copy");
		alert("copied to clipboard");
	},500);
}
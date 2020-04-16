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
	setTimeout(function(){
		var code = `<!DOCTYPE html>
	<html>
	<head>
		<title>Blue.js</title>
	</head>
	<body>
		<canvas id="canvas"></canvas>
		<script src="http://kiraprograms.com/blue/library.js"></script> <!--include blue-->
		<!--the converted code-->
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
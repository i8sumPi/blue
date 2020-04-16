var lines = ["console.log('you never assigned the lines to anything.')"];
var toReturn = "console.log('you never assigned anything to toReturn')";
var i;
function convertScript(code){
	var mostRecentEnter = 0;
	lines = [];
	for (i = 0; i < code.length; i++) {
		if(code[i] == "\n"){
			lines.push(code.slice(mostRecentEnter,i));
			mostRecentEnter = i+1;
		}
	}
	lines.push(code.slice(mostRecentEnter,code.length));
	for (var i = 0; i < lines.length; i++) {
		beginningOfLoop(i);
	}
	backToReturn();
	return toReturn;
}
function beginningOfLoop(i){
	if(lines[i].includes(" //")){
		lines[i] = lines[i].split(" //")[0];
	}else if(lines[i].includes("//")){
		lines[i] = lines[i].split("//")[0];
	}
	if(lines[i].slice(0,2) == "if" || lines[i].slice(0,7) == "else if"){
		if(lines[i].slice(0,2) == "if"){
			lines[i] = "if("+ lines[i].slice(2,lines[i].length);
		}else{
			lines[i] = "else if("+ lines[i].slice(7,lines[i].length);
		}
		lines[i] = lines[i] + "){";
		var endOfLoop = deleteVertical(i);
		addLine("}",endOfLoop-1);

	}else if(lines[i].slice(0,7) == "forever"){
		lines[i] = "repeatEvery 0.03";
	}else if(lines[i].slice(0,4) == "else"){
		lines[i] = lines[i] + "{";
		var endOfLoop = deleteVertical(i);
		addLine("}",endOfLoop-1);

	}else if(lines[i].slice(0,4) == "when"){
		lines[i] = "when( '"+ lines[i].slice(5,lines[i].length);
		lines[i] = lines[i] + "', function(){";
		var endOfLoop = deleteVertical(i);
		addLine("});",endOfLoop-1);

	} else if(lines[i].slice(0,17) == "end this interval"){
		lines[i] = "clearInterval(intervalPartOf)" + lines[i].slice(17,lines[i].length);

	}
	var firstPeriod = lines[i].indexOf(".");
	if(firstPeriod != -1 && lines[i].slice(firstPeriod+1, firstPeriod+13) == "instructions"){
		lines[i] = lines[i]+"function(){";
		var endOfLoop = deleteVertical(i);
		addLine("}",endOfLoop-1);
	}else if(lines[i].slice(0,11) == "repeatEvery"){
		lines[i] = "repeatEvery("+ lines[i].slice(11,lines[i].length);
		lines[i] = lines[i] + ", function(intervalPartOf){";
		var endOfLoop = deleteVertical(i);
		addLine("});",endOfLoop-1);

	}else if(lines[i].slice(0,4) == "wait"){
		lines[i] = "wait("+ lines[i].slice(4,lines[i].length);
		lines[i] = lines[i] + ", function(intervalPartOf){";
		var endOfLoop = deleteVertical(i);
		addLine("});",endOfLoop-1);

	}else if(lines[i].slice(0,7) == "forEach"){
		var variableName = lines[i].slice(7,lines[i].indexOf("in"));
		var listToIt = lines[i].slice(lines[i].indexOf("in")+3);

		lines[i] = "forEach("+lines[i].slice(7,lines[i].length)+", function("+variableName+"){";
		lines[i] = "forEach("+ listToIt +", function("+variableName+"){";
		var endOfLoop = deleteVertical(i);
		addLine("});",endOfLoop-1);

	//all of the drawing functions
	}else if(lines[i].slice(0,5) == "rect("){
		lines[i] = lines[i].slice(0,5) + "this," + lines[i].slice(5);
	}else if(lines[i].slice(0,5) == "oval("){
		lines[i] = lines[i].slice(0,5) + "this," + lines[i].slice(5);
	}else if(lines[i].slice(0,7) == "circle("){
		lines[i] = lines[i].slice(0,7) + "this," + lines[i].slice(7);
	}else if(lines[i].slice(0,8) == "polygon("){
		lines[i] = lines[i].slice(0,8) + "this," + lines[i].slice(8);
	}else if(lines[i].slice(0,5) == "line("){
		lines[i] = lines[i].slice(0,5) + "this," + lines[i].slice(5);
	}else if(lines[i].slice(0,5) == "text("){
		lines[i] = lines[i].slice(0,5) + "this," + lines[i].slice(5);
	}
}
function backToReturn(){
	toReturn = lines.join("\n");
}
function deleteVertical(i){
	var x = i+1;
	while(!(lines[x] == null) &&lines[x][0] == "|"){
		lines[x] = lines[x].slice(1,lines[x].length);
		x++;
	}
	return x;
}
function addLine(toAdd,where){
	var toAddList = [toAdd];
	lines = lines.slice(0,where+1).concat(toAddList.concat(lines.slice(where+1)));
}
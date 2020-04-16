var toR;

function highlightAll(){
	var allCodes = document.getElementsByTagName("code");
	for (var i = 0; i < allCodes.length; i++) {
		allCodes[i].className = "code";
		allCodes[i].innerHTML = highlight(allCodes[i].innerHTML);
	}
}
highlightAll(); //disable this line if you don't want the code highlighted in the beginning


function highlight(toH){
	//if you want to change colors, change the CSS in the string at the top
	toR = toH;
	toR = replSymb(toR); 
	toR = replace(toR, "\n", "</div><div>");

	functions(); //highlight all of the functions
	colorW(["&equals;","!","+","-","*","^","%","$","&lt","&gt","&amp"],"pink"); //makes all operators pink
	colorW(["when click end","when click","when drag","when key pressed","when left pressed","when right pressed","when up pressed","when down pressed","when space pressed",
		"when a pressed",
		"when b pressed",
		"when c pressed",
		"when d pressed",
		"when e pressed",
		"when f pressed",
		"when g pressed",
		"when h pressed",
		"when i pressed",
		"when j pressed",
		"when k pressed",
		"when l pressed",
		"when m pressed",
		"when n pressed",
		"when o pressed",
		"when p pressed",
		"when q pressed",
		"when r pressed",
		"when s pressed",
		"when t pressed",
		"when u pressed",
		"when v pressed",
		"when w pressed",
		"when x pressed",
		"when y pressed",
		"when z pressed",
	], "orangeItal"); //makes all keys, directions, and new objects orange
	colorW(["|"],"green"); //makes | green
	colorW(["0","1","2","3","4","5","6","7","8","9","#","true","false"], "purple"); //makes all numbers purple
	colorW(["if","else","when "," pressed","forever","repeatEvery ","forEach ","new ","after ","wait ","end this interval", "in "],"pink"); //makes all loops pink
	colorW(["function ","var ","document.","console."], "blueItal"); //makes all special words italicized and blue
	quotes(); //colors all strings yellow
	comments(); //colors all comments grey

	toR = replace(toR, "  ", "&nbsp&nbsp");
	toR = replace(toR, "<div></div>", "<div><br></div>");
	return toR;
}

function replace(toConv, dontWant, doWant){
	var tempList = toConv.split(dontWant);
	return tempList.join(doWant);
}
function replSymb(st){
	var toR = st;
	toR = replace(toR, "&lt;",`<`);
	toR = replace(toR, "&gt;",`>`);
	toR = replace(toR, `&`,"&amp");
	toR = replace(toR, `=`,"&equals;");
	toR = replace(toR, `"`,"&quot");
	toR = replace(toR, `<`,"&lt");
	toR = replace(toR, `>`,"&gt");
	return toR;
}

function colorW(words, color){ //color a word
	for (var i = 0; i < words.length; i++) {
		toR = toR.split(words[i]);
		toR = toR.join("<span class='"+color+"'>"+words[i]+"</span>"); //wraps the word in a colored div
	}
}
function quotes(){
	//this splits the text into a list separated by the "s. It takes every odd element of the list except the last (the 1, 3, 5, ...) and colors it yellow (a string)
	toR = toR.split("&quot");
	for (var i = 1; i < toR.length; i+=2) {
		if(i == toR.length-1){
			//there is a " without a pair and this is the last one
			toR[i] = "&quot"+toR[i];
		}else{
			toR[i] = "<span class='yellow'>&quot"+toR[i]+"&quot</span>";
		}
	}
	toR = toR.join("");
}
function comments(){
	//splits it up by lines. Then colors and commented part grey.
	toR = toR.split("</div><div>");
	for (var i = 0; i < toR.length; i++) {
		if(toR[i].split("//").length > 1){
			toR[i] = toR[i].split("//")[0] +"<span class='grey'>//"+ toR[i].split("//").slice(1).join("//") + "</span>";
		}
	}
	toR = toR.join("</div><div>");
}
function functions(){
	toR = toR.split("(");
	for (var i = 0; i < toR.length-1; i++) {
		var lastWord = toR[i];
		lastWord = lastWord.split(" ")[lastWord.split(" ").length-1];
		lastWord = lastWord.split("</div>")[lastWord.split("</div>").length-1]; //line break
		lastWord = lastWord.split("|")[lastWord.split("|").length-1]; //split by |
		lastWord = lastWord.split("+")[lastWord.split("+").length-1]; //split by +
		lastWord = lastWord.split("-")[lastWord.split("-").length-1]; //split by -
		lastWord = lastWord.split("*")[lastWord.split("*").length-1]; //split by *
		lastWord = lastWord.split("/")[lastWord.split("/").length-1]; //split by /
		lastWord = lastWord.split(".")[lastWord.split(".").length-1]; //this is the last word before the (

		var secondLast = toR[i].slice(0,-lastWord.length-1);
		secondLast = secondLast.split(" ")[secondLast.split(" ").length-1];
		secondLast = secondLast.split("</div>")[secondLast.split("</div>").length-1]; //line break
		secondLast = secondLast.split("|")[secondLast.split("|").length-1]; //split by |
		secondLast = secondLast.split("+")[secondLast.split("+").length-1]; //split by +
		secondLast = secondLast.split("-")[secondLast.split("-").length-1]; //split by -
		secondLast = secondLast.split("*")[secondLast.split("*").length-1]; //split by *
		secondLast = secondLast.split("/")[secondLast.split("/").length-1]; //split by /
		secondLast = secondLast.split(".")[secondLast.split(".").length-1]; //this is the 2nd to last word before the (
		if(secondLast == "function"){ //if the previous word is "function", you are defining a function so color it green
			toR[i] = toR[i].slice(0,toR[i].length-lastWord.length) + "<span class='green'>"+lastWord+"</span>";
		}else{
			toR[i] = toR[i].slice(0,toR[i].length-lastWord.length) + "<span class='blue'>"+lastWord+"</span>";
		}
	};
	toR = toR.join("(");
}
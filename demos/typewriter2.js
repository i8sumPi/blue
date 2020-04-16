var theCode = `var myText = new Text();
myText.text = "";

var typed = "";

//go through each each letter, and add that letter to typed when you press it.
when a pressed
|typed = typed + "a";
when b pressed
|typed = typed + "b";
when c pressed
|typed = typed + "c";
when d pressed
|typed = typed + "d";
when e pressed
|typed = typed + "e";
when f pressed
|typed = typed + "f";
when g pressed
|typed = typed + "g";
when h pressed
|typed = typed + "h";
when i pressed
|typed = typed + "i";
when j pressed
|typed = typed + "j";
when k pressed
|typed = typed + "k";
when l pressed
|typed = typed + "l";
when m pressed
|typed = typed + "m";
when n pressed
|typed = typed + "n";
when o pressed
|typed = typed + "o";
when p pressed
|typed = typed + "p";
when q pressed
|typed = typed + "q";
when r pressed
|typed = typed + "r";
when s pressed
|typed = typed + "s";
when t pressed
|typed = typed + "t";
when u pressed
|typed = typed + "u";
when v pressed
|typed = typed + "v";
when w pressed
|typed = typed + "w";
when x pressed
|typed = typed + "x";
when y pressed
|typed = typed + "y";
when z pressed
|typed = typed + "z";

//when you press space, add a space.
when space pressed
|typed = typed + " ";

//console typed whenever you press a letter.
when key pressed
|myText.text = typed;`
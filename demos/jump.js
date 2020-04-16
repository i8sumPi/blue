var theCode = `var playState = "playing";
var score = 0;

var char = new Custom();
char.instructions = 
|circle(0,0,30,"blue");
|circle(20,0,10,"white");
|line(-5,0,20,0,"white",3,"white");
|line(-5,0,-20,5,"white",3,"white");
|circle(-5,0,10,"white");

var background = new Custom();
background.instructions = 
|rect(-width/2, -130, width, 25, "green");
|rect(-width/2, -155, width, height/2, "#915003");
|text("Welcome to Jump!",0,300);
|text("Press space to jump and avoid the red spikes.",0,265,"black",20);

var scoreText = new Text();
scoreText.text = "Your score is 0";
scoreText.size = 20;

var spike = new Custom();
spike.instructions =
|polygon([-30,0,30,0,0,52], "red",0);
spike.hidden = true;
spike.x = width/2;
spike.y = -130;

var allSpikes = [];

char.x = -width/2 + 100;
char.y = -100;
char.ySpeed = 0;

when space pressed
|if playState == "playing"
||if char.y == -100
|||char.ySpeed = 25;
|||char.y += char.ySpeed;
|
|else //playState = dead
||//restart the game
||forEach i in allSpikes
|||i.delete();
||allSpikes = [];
||score = 0;
||playState = "playing";
||console.log("game restarted");

forever
|if playState == "playing"
||score += 0.1;
||scoreText.text = "Your score is "+round(score);
||if char.y > -100
|||char.y += char.ySpeed;
|||char.ySpeed -=3;
||else
|||char.y = -100
|||char.ySpeed = 0;
||
||forEach i in allSpikes
|||i.x += -10;
|||if i.x > -width/2+100-40 && i.x < -width/2+100+40 && char.y == -100
||||playState = "dead";
||||scoreText.text = "You died. Your score was "+round(score)+". Press Space to restart.";
||
||if random() < 0.04
|||var newSp = spike.copy();
|||newSp.hidden = false;
|||allSpikes.push(newSp);`;
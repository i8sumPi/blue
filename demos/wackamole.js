theCode = `var mole = new Circle(); //create the mole
var score = new Text(); //this displays the score
score.text = 0;

repeatEvery 1.5
|mole.hidden = true; //show and go to random position
|mole.x = (random()-0.5)*width;
|mole.y = (random()-0.5)*height;
|wait 0.75 //hide again after 0.75 secs
||mole.hidden = false;

when click //if you click on it, add points.
|if mole.distanceTo(mouse) < 100 && !mole.hidden
||score.text += 1;`;
var theCode = `//set up dimensions of a base raindrop. It will be invisible because it is only for copying. 
var base = new Circle();
base.radius = 30;
base.ySpeed = 0; //this is a custom parameter.
base.hidden = true;
base.y = height/2 + 100;

//we will have a list of raindrops here
var rain = [];

forever
|var x;
|forEach x in rain
||//this code is run many times where x = each raindrop.
||x.y += x.ySpeed; //move the raindrop down
||x.ySpeed -= 1; //increase the acceleration
||
||//go to the top if at the bottom.
||if x.y < -height/2 
|||x.y = height/2 + 100;
|||x.ySpeed = 0;
|||x.x = (Math.random()-0.5)*width;
|
|//if there are less than 10 raindrops and a random number is less than 1/10, create another raindrop.
|if random() < 0.1 && rain.length < 10
||var newDrop = base.copy(); //create a copy of the base raindrop
||newDrop.hidden = false; //unlike the base, this isn't hidden
||newDrop.x = (Math.random()-0.5)*width; //make it a random x position
||rain.push(newDrop); //add it to the list of raindrops so it can be moved.
||console.log("created a new drop");`
theCode = `var ans = prompt("Welcome to my text adventure! You are a bear. What do you want to do? \\n1. Eat a pancake\\n2. Eat cheese");
if ans == 1
|ans = prompt("1. Go to the store and buy pancakes\\n2. Make pancakes from scratch");
|if ans == 1
||alert("The store didn't have any pancakes. You have to make them from scratch!");
|ans = prompt("What type of pancakes do you want?\\n1. Plain\\n2. Blueberry\\n3. Chocolate Chip\\n4. Pumpkin Spice");
|if ans == 1 || ans == 2
||alert("They were a massive success!! YAY! ");
|else if ans == 3
||alert("The pancakes burned. Oh well.");
|else if ans == 4
||alert("The pancakes were so good that you became a famous chef! Congrats!!!");
else
|ans = prompt("There is a little cheese but it is expired.\\n1. Eat it anyways \\n2. Give up.");
|if ans == 1
||alert("YUM! The cheese is delicous. After a few hours, however, you get a big stomach ache because the cheese was rotten.");
alert("That's it. Thanks for playing!!");`;
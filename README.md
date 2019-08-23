# Blue
An easy first programming language! Check the Wiki for tons of detailed lessons!
Blue can be used to quickly and easily create graphics and games. You can create complex sprites that move around easily. Go to http://kiraprograms.com/blue.html for an online editor. If you want to use your own text editor but don't want to download anything more, include the following script at the top of the html:
```html
<script src="http://kiraprograms.com/blue.js"></script>
```
## Intro:
In every line, you will see a line of code. The first line of code will be run, then the second, then the third, etc.
We always end every line of code with a `;`.

## Variables:
Variables store information. For example, we can say:
```javascript
var health = 100;
```
When we use the word `var`, it means that we are defining the variable. You must always define a variable if it doesn't exist already. 
This means that whever we write `health`, you will get the number `100`.
Variables can be changed. 
```javascript
var health = 100;
health = health - 1;
```
The code above subtracts one from what health already is. ADD MORE STUFF HERE!!!!

## The Console
The purpose of the console is to write variables or text. The console can be used for debugging (trying to find what a problem in your code is) because you can write what a variable is in a given time. <br><br>
The next thing that you want to do is open the *Chrome Developer Tools*. You can right-click the page and then select Inspect to open them. If that doesn't work, go [here](https://developers.google.com/web/tools/chrome-devtools/) for other ways to open them and more about the dev tools. <br><br>
The developer tools can be a bit overwelming because there are so many thing you can do, but don't worry! We won't be needing them all! On the top of the dev tools, you should see tabs called Elements, Console, Application, etc. (but maybe some different things in a different order). 
![Image of the dev tools](http://kiraprograms.com/blue/developerTools.png)
What we will be using the the **Console**. If you don't see the console in the list of tabs, click on the **>>** to see more tabs and you should se the **Console** there.<br><br>
To write "hello":
```javascript
log("hello");
```
You should see `hello` in the console.
To write the variable "x":
```javascript
var x = 0;
log(x);
```
You should see `0` in the console.<br><br>
### What is this code doing?
Log is a **function**. Every time you type `log(something)`, Blue puts what you want to write in the console. 

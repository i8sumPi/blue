# Blue
Many people learn to code using complicated programming languages that make it difficult to begin. Languages such as JavaScript, Python, Java, or C++ commonly require downloading lots of applications onto your computer and getting really technical right away. Creating graphics, user inputs (arrow keys, clicking), and other important game features requires even more overhead. With Blue, you can create games in just 12 lines of code that could take hundreds of lines in other languages. Blue allows you to create a complex game without having to know a lot of programming. It makes coding more fun and fulfilling even in the beginning! Since Blue is 100% in the browser, you don't need to download anything. It is also easy to compile Blue code into HTML, which can create a real, publishable website!

## How to Get Started
Blue is run in the online editor, at http://kiraprograms.com/blue. You can also run blue on your computer by cloning this repository, but it is easier to just do it online. This README isn't very fleshed out, but to see full documentation go to http://kiraprograms.com/blue/help.html.

## What is Blue?
Blue is a simple programming language that makes it easy to create graphic-oriented programs! Blue compliles into JavaScript and HTML, so it is easy to turn it into a real website (there is a button, `EXPORT TO WEBSITE`).

## How Does Blue Work?
### Saving Projects
Blue has a Text Editor with auto-bracket-completion, syntax, highlighting, project saving, and more. All of this was made from scratch without any libraries. If you are making your own text editor, you might want to look at this code. Blue stores your code in the javascript `localStorage`. 

### Syntax Highlighting
Syntax highlighting with JavaScript and HTML can be very difficult without a library. Blue does this by having a clear textarea which is directly on top of a div with the colored code. To enable scrolling, the textarea expands to the exact size of the text every time the user writes something. The only part of the textarea that is seen is the cursor; the rest is invisible. I created the actual syntax highlighting code from of a different library I made called `Lightweight Javascript Syntax Highlighter`. 

### Running the Code
1. The first thing Blue does when running the code is turning it from Blue Syntax to JavaScript. Blue treats the code as a string and makes all sorts of changes. To see how this works, see the function `convertScript` in the file  `convertToJs.js`. 
2. Then, using `eval()`, it runs the code.
3. Blue includes a JavaScript library that includes all sorts of special functions, classes, variables, Blue will also automatically create a canvas, handles the event listeners and more. To see more about this, go to `library.js `.

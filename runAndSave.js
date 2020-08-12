var runMode;
//set up stuff
if(localStorage.getItem("all blue projects") == null){
	//this is the first time acessing blue.
	localStorage.setItem("all blue projects","demo project");
	//democode is defined in script.js
	localStorage.setItem("blue.js demo project",demoCode);
	localStorage.setItem("currentProject",-1);
	//show the help page
	el("helpModal").style.display = "block";
}
currentProject = localStorage.getItem("currentProject");
var allProjects = localStorage.getItem("all blue projects").split(",");
if(allProjects.length == 1 && allProjects[0] == ""){
	allProjects = [];
}
//run the code
if(localStorage.getItem("currentProject") != -1){
	el("code").value = localStorage.getItem("blue.js "+allProjects[currentProject]);
	updateHighlight();
	runMode = true;
	el("editMode").style.display = "none";
	el("runMode").style.display = "block";
	el("chooseProject").style.display = "none";
	//var userCode = new Function(convertScript(el("code").value));
	setTimeout(function(){
		eval(convertScript(el("code").value))
	},10);
}else{
	runMode = false;
	el("editMode").style.display = "none";
	el("runMode").style.display = "none";
	el("chooseProject").style.display = "block";
	showAllProjects();
}
localStorage.setItem("currentProject",-1);

function run(){
	localStorage.setItem("currentProject",currentProject);
	location.reload();
}
function backToEdit(){
	el("editMode").style.display = "block";
	el("runMode").style.display = "none";
	runMode = false;
	localStorage.setItem("currentProject",-1);
	clearAllIntervals();
	console.clear();
}
function clearAllIntervals(){
	for (var i = 0; i < intervals.length; i++) {
		clearInterval(intervals[i]);
	}
	clearInterval(drawCharactersVar);
}

function save(){
	localStorage.setItem("blue.js "+allProjects[currentProject],el("code").value);
}
function addProject(){
	var name = prompt("What is the name of your project? Please don't have any commas.","EX: Monster Dodger Supreme!!");
	if(name != null){
		localStorage.setItem("blue.js "+name,"");
		allProjects.push(name);
		localStorage.setItem("all blue projects",allProjects);
		showAllProjects();
	}
}
function showAllProjects(){
	var allProjectButtons = "";
	for (var i = 0; i < allProjects.length; i++) {
		allProjectButtons = allProjectButtons + `<div class='projectRow'><button class='project' onclick='startProject(`+i+`)'>`+allProjects[i]+`</button>
		<button onclick="deleteProject(`+i+`)">Delete</button>
		<button onclick="renameProject(`+i+`)">Rename</button></div>`
	}
	el("allProjectButtons").innerHTML = allProjectButtons;
	var bigProjectButtons = document.getElementsByClassName("project");
	for (var i = 0; i < bigProjectButtons.length; i++) {
		bigProjectButtons[i].style.width = width-150 + "px";
	}
}
function startProject(i){
	el("editMode").style.display = "block";
	el("runMode").style.display = "none";
	el("chooseProject").style.display = "none";
	el("code").innerHTML = localStorage.getItem("blue.js "+allProjects[i]);
	updateHighlight();
	currentProject = i;
}
function deleteProject(toBeDeleted){
	var confirmed = confirm("Are you sure? You can't undo this action.");
	if(confirmed){
		localStorage.removeItem("blue.js "+allProjects[toBeDeleted]);
		allProjects = allProjects.slice(0,toBeDeleted).concat(allProjects.slice(toBeDeleted+1));
		localStorage.setItem("all blue projects",allProjects);
		location.reload();
	}
}
function renameProject(toBeRenamed){
	var newName = [prompt("what do you want to rename your project to be?","EX: Monster Dodger Supreme!!")];
	if(newName[0] != null){
		localStorage.setItem("blue.js "+newName, localStorage.getItem("blue.js "+allProjects[toBeRenamed]));
		localStorage.removeItem("blue.js "+allProjects[toBeRenamed]);

		allProjects = allProjects.slice(0,toBeRenamed).concat(newName.concat(allProjects.slice(toBeRenamed+1)));
		localStorage.setItem("all blue projects",allProjects);
		location.reload();
	}
}
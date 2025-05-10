import { createTask, createProject} from "./create"
import { format } from "date-fns"
import "./style.css"

let storage = {
    projects: [],
    tasks: []
}

// show form 
const addTaskButton = document.querySelector('.add-task');

//get task form
const taskForm = document.querySelector('.taskForm');

addTaskButton.addEventListener('click', () => {
    taskForm.classList.remove('hide');
})

// New Project Button 
const addProjectButton = document.querySelector('.new-project');

//get project form 
const projectForm = document.querySelector('.projectForm');

addProjectButton.addEventListener('click', () => {
    projectForm.classList.remove('hide');
})


// project container
const projectContainer = document.querySelector('.project-container');

// form project list
const projectList = document.querySelector('#project');


// adding project
const addProject = document.querySelector('.add-project');
addProject.addEventListener('click', (e) => {
    e.preventDefault();

    // Getting project name
    const projectName = document.querySelector('#projectName').value;

    // check for dup project name 
    const dupName = storage.projects.find(p => p.name === projectName);

    // if no dup
    if(!dupName){
        const newProject = createProject(projectName);
        storage.projects.push(newProject);
        // projectForm.classList.add('hide');

        // add project button
        const projectButton = document.createElement('button');
        projectButton.classList.add('project');
        projectButton.textContent = projectName;

        // project button filter to its own tasks

        projectButton.addEventListener('click', () => displayProjectTasks(projectName));

        projectContainer.appendChild(projectButton);


        // add to project list in task form
        const projectOption = document.createElement('option');
        projectOption.textContent = projectName;
        projectOption.value = projectName;

        projectList.appendChild(projectOption);
        
    }

    projectForm.reset();
    projectForm.classList.add('hide');


})


// New Task Button
const submitTask = document.querySelector('.submit-task');
submitTask.addEventListener('click', (e) => {
    e.preventDefault();

    // Getting form values
    const taskTitle = document.querySelector('#title').value;

    const taskDesc = document.querySelector('#description').value;

    const taskDate = document.querySelector('#dueDate').value;

    const priority = document.querySelector('input[name="priority"]:checked').value;

    const project = document.querySelector('#project').value;

    const newTask = createTask(taskTitle, taskDesc, taskDate, priority, project);

    // console.log(project)
    // console.log("New Task:", newTask);

    storage.tasks.push(newTask);

    // add task to associate project if there is project value 
    if(project){
        const projectName = storage.projects.find(p => p.name === project);
        projectName.addTask(newTask);
        displayProjectTasks(project);
    } else{
        displayAllTasks();
    }

    document.querySelector('.taskForm').reset();

    taskForm.classList.add('hide');


    
    
});

function taskCard(title, dueDate){
    //task div container
    const taskDiv = document.createElement('div');
    const taskTitle = document.createElement('h1');
    taskTitle.textContent = title;
    const taskDate = document.createElement('h3');
    taskDate.textContent = dueDate;
    // complete button toggle 
    const completeButton = document.createElement('button');
    completeButton.addEventListener('click', (e) => {
        const curTask = e.target;
        curTask.toggleComplete();
    })


    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDate);
    taskDiv.appendChild(completeButton);

    return taskDiv;
}


function displayAllTasks() {
    const tasksContainer = document.querySelector('.tasks-container');

    tasksContainer.innerHTML = '';
    
    storage.tasks.forEach((task) => {
        const taskTitle = task.title;
        const taskDueDate = task.dueDate;

        tasksContainer.appendChild(taskCard(taskTitle, taskDueDate));
    })
}

function displayProjectTasks(project){
    const tasksContainer = document.querySelector('.tasks-container');

    tasksContainer.innerHTML = '';


    const targetProject = storage.projects.find(p => p.name === project);
    targetProject.tasks.forEach((task) => {
        const taskTitle = task.title;
        const taskDueDate = task.dueDate;

        tasksContainer.appendChild(taskCard(taskTitle, taskDueDate));
    })
}


const allTasksButton = document.querySelector('.allTasks');
allTasksButton.addEventListener('click', displayAllTasks);



window.storage = storage
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

    document.querySelector('.taskForm').reset();

    taskForm.classList.add('hide');

    displayAllTasks();
    
});

function taskCard(title, dueDate){
    //task div container
    const taskDiv = document.createElement('div');
    const taskTitle = document.createElement('h1');
    taskTitle.textContent = title;
    const taskDate = document.createElement('h3');
    taskDate.textContent = dueDate;

    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDate);

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
}

// window.storage = storage
import { handleNewProject } from "./handlers/projectController";
import { handleNewTask } from "./handlers/taskController";
import { getTaskFormData, getProjectFormData } from "./form";
import { Storage } from "./storage";
import * as View from "./view";
import { format } from "date-fns";
import "./style.css";

let currentPage = 'All Tasks'

// show form 
const addTaskButton = document.querySelector('.add-task');
addTaskButton.addEventListener('click', () => {
    taskForm.classList.remove('hide');
})
// task form
const taskForm = document.querySelector('.taskForm');

// New Project Button 
const addProjectButton = document.querySelector('.new-project');
addProjectButton.addEventListener('click', () => {
    projectForm.classList.remove('hide');
})
// project form 
const projectForm = document.querySelector('.projectForm');

// adding project
const addProject = document.querySelector('.add-project');
addProject.addEventListener('click', (e) => {
    e.preventDefault();
    // Getting project name
    const projectData = getProjectFormData();
    // check for dup project name 
    const dupName = Storage.projects.find(p => p.name === projectData.name);
    // if no dup
    if(!dupName){
        const project = handleNewProject(projectData);
        View.createProjectCard(project);
    }
    projectForm.reset();
    projectForm.classList.add('hide');
})

// New Task Button
const submitTask = document.querySelector('.submit-task');
submitTask.addEventListener('click', (e) => {
    e.preventDefault();
    const taskData = getTaskFormData();
    handleNewTask(taskData);
    if(taskData.project){
        const project = Storage.projects.find(p => p.name === taskData.project);
        View.renderTaskList(project.tasks);
        View.setCurrentPage(taskData.project);
        console.log(View.currentPage);
    } else{
        View.renderTaskList(Storage.tasks);
        View.setCurrentPage('All tasks');
        console.log(View.currentPage);
    }
    document.querySelector('.taskForm').reset();
    taskForm.classList.add('hide'); 
});




window.storage = Storage
import { handleNewProject } from "./handlers/projectController";
import { handleNewTask } from "./handlers/taskController";
import { getTaskFormData, getProjectFormData } from "./form";
import { Storage } from "./storage";
import * as View from "./view";
import { format } from "date-fns";
import "./style.css";


document.addEventListener("DOMContentLoaded", () => {
    Storage.loadProjects();
    Storage.loadTasks();
    View.renderTaskList(Storage.tasks);
    View.renderProjectCard(Storage.projects);

    const closeFormBtn = document.querySelector('.close-btn');

    (function addProject(){
        const projectFormContainer = document.querySelector('.project-form-container');
        const projectForm = document.querySelector('.projectForm');
        const addProjectButton = document.querySelector('.new-project');
        const closeFormBtn = document.querySelector('.close-projectForm-btn');
        closeFormBtn.addEventListener('click', () => {
            projectFormContainer.classList.add('hide');
        })
        addProjectButton.addEventListener('click', () => {
            projectFormContainer.classList.remove('hide');
        })
        const submitProjectBtn = document.querySelector('.add-project');
        submitProjectBtn.addEventListener('click', (e) => {
            if (!projectForm.checkValidity()) {
                // Form is invalid — stop submission and show validation
                e.preventDefault();
                projectForm.reportValidity(); // This shows the browser validation messages
                return;
            }
            e.preventDefault();
            // Getting project name
            const projectData = getProjectFormData();
            // check for dup project name 
            const dupName = Storage.projects.find(p => p.name === projectData.name);
            // if no dup
            if(!dupName){
                handleNewProject(projectData);
                View.renderProjectCard(Storage.projects);
            }
            projectForm.reset();
            projectFormContainer.classList.add('hide');
        })
    })();

    (function addTask(){
        // task form
        const taskForm = document.querySelector('.taskForm');
        // form container
        const taskFormContainer = document.querySelector('.task-form-container');
        const closeFormBtn = document.querySelector('.close-taskForm-btn');
        closeFormBtn.addEventListener('click', () => {
            taskFormContainer.classList.add('hide');
        })
        // show form 
        const addTaskButton = document.querySelector('.add-task');
        addTaskButton.addEventListener('click', () => {
            taskFormContainer.classList.remove('hide');
            taskForm.reset();
        })
        // New Task Button
        const submitTask = document.querySelector('.submit-task');
        submitTask.addEventListener('click', (e) => {
            if (!taskForm.checkValidity()) {
                // Form is invalid — stop submission and show validation
                e.preventDefault();
                taskForm.reportValidity(); // This shows the browser validation messages
                return;
            }
            e.preventDefault();
            const taskData = getTaskFormData();
            handleNewTask(taskData);
            if(taskData.project){
                const project = Storage.projects.find(p => p.name === taskData.project);
                View.renderTaskList(project.tasks);
                View.setCurrentPage(taskData.project);
                // console.log(View.currentPage);
            } else{
                View.renderTaskList(Storage.tasks);
                View.setCurrentPage('All tasks');
                // console.log(View.currentPage);
            }
            taskFormContainer.classList.add('hide');
        });
    
    })();
})


window.storage = Storage
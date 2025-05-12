import { createTask, createProject} from "./create"
import { format } from "date-fns"
import "./style.css"

let storage = {
    projects: [],
    tasks: []
}

let currentPage = 'All Tasks'

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

        const container = document.createElement('div');
        container.className = projectName;


        // add project button
        const projectButton = document.createElement('button');
        projectButton.classList.add('project');
        projectButton.textContent = projectName;

        // adding project delete button
        const projectRemoveButton = document.createElement('button');
        projectRemoveButton.classList.add('delete-project');
        projectRemoveButton.textContent = 'delete';

        projectRemoveButton.addEventListener('click', () => {
            const projectIdx = storage.projects.findIndex(p => p.name === projectName)
            storage.projects.splice(projectIdx, 1);
            container.remove();
            projectOption.remove();
        })

        container.appendChild(projectButton);
        container.appendChild(projectRemoveButton);


        // project button filter to its own tasks
        projectButton.addEventListener('click', () => {
            displayProjectTasks(projectName)
            currentPage = projectName;
        });

        projectContainer.appendChild(container);


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




function taskCard(task){
    //task div container
    const taskDiv = document.createElement('div');
    const taskTitle = document.createElement('h1');
    taskTitle.textContent = task.title;
    const taskDate = document.createElement('h3');
    taskDate.textContent = task.dueDate;

    // complete button toggle 
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete'
    completeButton.addEventListener('click', () => {
        // const curTask = findTask(id);
        const index = findIndex(storage.tasks, task.id);
        const curTask = storage.tasks[index];
        curTask.toggleComplete();
        displayPage(currentPage);
    })



    // Delete button 
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete'
    deleteButton.addEventListener('click', () => {
        const index = findIndex(storage.tasks, task.id);

        // delete tasksfrom global;
        if (index !== -1){
            storage.tasks.splice(index, 1);
        }

        // delete task from project;
        if (task.project){
            const taskProject = storage.projects.find(p => p.name === task.project);
            const index = findIndex(taskProject.tasks, task.id);

            if (index !== -1){
                taskProject.updateTasks(index);
            }
            
        }

        displayPage(currentPage);
    })




    // edit button;
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        addTaskButton.click();

         // Getting form values
        let taskTitle = document.querySelector('#title');
        taskTitle.value = task.title;
        let taskDesc = document.querySelector('#description');
        taskDesc.value = task.description;
        let dueDate = document.querySelector('#dueDate');
        dueDate.value = task.dueDate;

        
        let taskPriority = document.querySelectorAll('input[name="priority"]');
        const matchPriority = Array.from(taskPriority).find(
            p => p.value === task.priority
        );
        
        if (matchPriority) {
            matchPriority.checked = true;
        }
        // taskPriority.value = task.priority;

        let taskProject =  document.querySelector('#project');
        const projectOptions = taskProject.options;
        let previousProject;
        const matchProject =  Array.from(projectOptions).find(
            p => p.textContent === task.project
        );
        
        if (matchProject) {
            matchProject.selected = true;
            previousProject = matchProject.textContent;
        }

        document.querySelector('.submit-task').classList.add('hide');
        const editSubmitButton = document.querySelector('.edit-task');
        editSubmitButton.classList.remove('hide')

        editSubmitButton.addEventListener('click', (e) => {
            e.preventDefault();

            taskPriority = document.querySelectorAll('input[name="priority"]:checked');
            task.edit(taskTitle.value, taskDesc.value, dueDate.value, taskPriority.value, taskProject.value);
            document.querySelector('.taskForm').reset();

            taskForm.classList.add('hide'); 


            // when you edit you move to the new project, also remove from old project if it's associate to a project 
            // check if there are previous project or not
            const oldProject = storage.projects.find(p => p.name === previousProject);
            const newProject = storage.projects.find(p => p.name === taskProject.value);
            if(previousProject){
                // add task to new project
                newProject.addTask(task);
                // remove from old project
                const taskIdx = findIndex(oldProject, task.id);
                oldProject.updateTasks(taskIdx);

                displayProjectTasks(newProject.tasks);
            } else{
                if (newProject){
                    // add task to new project
                    newProject.addTask(task);
                    displayProjectTasks(newProject.tasks);
                }
                displayAllTasks();
            }
            // console.log(currentPage)
        });


    })


    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDate);
    taskDiv.appendChild(completeButton);
    taskDiv.appendChild(deleteButton);
    taskDiv.appendChild(editButton);

    return taskDiv;
}




function displayPage(curPage){
    switch(curPage){
        case 'All Tasks':
            displayAllTasks();
            break;
        case 'Complete':
            completeTasksButton.click();
            break;
        case 'Today':
            break;
        default: 
            displayProjectTasks(curPage);
    }
}



// function findTask(id){
//     return storage.tasks.find(t => t.id === id);
// }

function findIndex(place, id){
    return place.findIndex(t => t.id === id);
}


function displayAllTasks() {
    displayTasks(storage.tasks);
}

function displayProjectTasks(project){
    const targetProject = storage.projects.find(p => p.name === project);
    displayTasks(targetProject.tasks);
}


function displayTasks(tasks){
    const tasksContainer = document.querySelector('.tasks-container');

    tasksContainer.innerHTML = '';

    tasks.forEach((task) => {
        tasksContainer.appendChild(taskCard(task));
    })
}

const allTasksButton = document.querySelector('.allTasks');
allTasksButton.addEventListener('click', () => {
    displayAllTasks();
    currentPage = 'All Tasks';
});


const completeTasksButton = document.querySelector('.completeTasks');
completeTasksButton.addEventListener('click', () => {

    const completeTasks = storage.tasks.filter((task) => task.complete === true);

    displayTasks(completeTasks);
    currentPage = 'Complete';

});


window.storage = storage
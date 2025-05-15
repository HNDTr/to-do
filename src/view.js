import {Storage} from './storage'
import { handleEditTask } from './handlers/taskController';
import { getTaskFormData, setTaskFormData } from './form';

let currentPage = 'All Tasks';

function renderTaskList(tasks) {
    const container = document.querySelector('.tasks-container');
    container.innerHTML = '';
    tasks.forEach(task => container.appendChild(createTaskCard(task)));
}

function createTaskCard(task){
    // form container
    const taskFormContainer = document.querySelector('.task-form-container');
    
    const card = document.createElement('div');
    card.className = 'task-card';
    card.innerHTML = `
        <h1>${task.title}</h1>
        <h3>${task.dueDate}</h3>
    `;

    // Complete Button and Event
    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.complete ? 'Undo' : 'Complete';
    completeBtn.addEventListener('click', () => {
        task.toggleComplete();
        Storage.saveTasks();
        Storage.saveProjects();
        // Put in how you want page to render (TODO)
        displayPage(currentPage);
    })

    // Delete Button and Event
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        Storage.deleteTask(task.id);
        // Put in how you want page to render (TODO)
        displayPage(currentPage);
    })

    //Edit Button and Event
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
        setTaskFormData(task);
        taskFormContainer.classList.remove('hide'); 
        // taskForm.classList.remove('hide'); 
        const submitButton = document.querySelector('.submit-task');
        submitButton.classList.add('hide');
        const editSubmitButton = document.querySelector('.edit-task');
        editSubmitButton.classList.remove('hide')
        editSubmitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const editData = getTaskFormData();
            handleEditTask(task, editData);
            taskFormContainer.classList.add('hide'); 
            submitButton.classList.remove('hide');
            editSubmitButton.classList.add('hide')
            setCurrentPage(editData.project)
             // Put in how you want page to render (TODO)
            displayPage(currentPage);
        }, {once: true});
    })

    card.appendChild(completeBtn);
    card.appendChild(deleteBtn);
    card.appendChild(editBtn);
    return card;
}

function renderProjectCard(projects){
    const projectContainer = document.querySelector('.project-container');
    projectContainer.innerHTML = '';
    projects.forEach(project => projectContainer.appendChild(createProjectCard(project)));
}

// TODO Project render
function createProjectCard(project){
    const projectList = document.querySelector('#project');

    const container = document.createElement('div');
    container.className = project.name;


    // add to project list in task form
    const projectOption = document.createElement('option');
    projectOption.textContent = project.name;
    projectOption.value = project.name;
    projectList.appendChild(projectOption);

    // project button
    const projectButton = document.createElement('button');
    projectButton.classList.add('project');
    projectButton.textContent = project.name;
    // project button filter to its own tasks
    projectButton.addEventListener('click', () => {
        renderTaskList(project.tasks);
        setCurrentPage(project.name);
        console.log(currentPage);
    });

    const projectRemoveButton = document.createElement('button');
    // projectRemoveButton.classList.add('delete-project');
    projectRemoveButton.textContent = 'delete';
    projectRemoveButton.addEventListener('click', () => {
        Storage.deleteProject(project.name);
        renderTaskList(Storage.tasks);
        container.remove();
        projectOption.remove();
    })

    // Edit project name

    container.appendChild(projectButton);
    container.appendChild(projectRemoveButton);

    return container


}


function displayPage(curPage){
    switch(curPage){
        case 'All Tasks':
            renderTaskList(Storage.tasks);
            break;
        case 'Complete':
            const completeTasks = Storage.tasks.filter((task) => task.complete === true);
            renderTaskList(completeTasks);
            break;
        case 'Today':
            break;
        default: 
            // find project and display its 
            const curProject = Storage.projects.find(p => p.name === curPage);
            if (curProject){
                renderTaskList(curProject.tasks);
            }
            renderTaskList(Storage.tasks);
            break;
    }
}

function setCurrentPage(curPage){
    currentPage = curPage;
}

const allTasksButton = document.querySelector('.allTasks');
allTasksButton.addEventListener('click', () => {
    currentPage = 'All Tasks';
    displayPage(currentPage);
});


const completeTasksButton = document.querySelector('.completeTasks');
completeTasksButton.addEventListener('click', () => {
    currentPage = 'Complete';
    displayPage(currentPage);
});


export {renderTaskList, createProjectCard, displayPage, setCurrentPage, renderProjectCard}
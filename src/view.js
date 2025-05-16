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
    

    const dateDiv = document.createElement('div');
    dateDiv.className = "due-check-div"

    const dueDate = document.createElement('h3');
    dueDate.textContent = `${task.dueDate}`;

    const taskTitle = document.createElement('h1');
    taskTitle.className = 'task-title'
    taskTitle.textContent = `${task.title}`;

    //render card background-color based on priority
    if(task.priority === 'Low'){
        card.style.backgroundColor = `rgb(108, 165, 245)`
    } else if(task.priority === 'Medium'){
        card.style.backgroundColor = `rgb(237, 171, 78)`
    }else{
        card.style.backgroundColor = `rgb(247, 108, 89)`
    }

    dateDiv.appendChild(dueDate);
    card.appendChild(dateDiv);
    card.appendChild(taskTitle);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-div')

    // Complete Button and Event
    const completeBtn = document.createElement('input');
    completeBtn.type = 'checkbox'
    completeBtn.checked = task.complete;
    // completeBtn.textContent = task.complete ? 'Undo' : 'Complete';
    completeBtn.addEventListener('click', () => {
        // completeBtn.checked
        task.toggleComplete();
        Storage.saveTasks();
        Storage.saveProjects();
        // card.style.backgroundColor  = `rgb(62, 194, 50)`
        // Put in how you want page to render (TODO)
        displayPage(currentPage);
    })
    dateDiv.appendChild(completeBtn);

    // Delete Button and Event
    const deleteBtn = document.createElement('i');
    deleteBtn.className = 'bi bi-trash-fill'
    deleteBtn.addEventListener('click', () => {
        Storage.deleteTask(task.id);
        // Put in how you want page to render (TODO)
        displayPage(currentPage);
    })


    const submitButton = document.querySelector('.submit-task');
    const editSubmitButton = document.querySelector('.edit-task');
    //Edit Button and Event
    const editBtn = document.createElement('i');
    editBtn.className = "bi bi-pencil-square";
    editBtn.addEventListener('click', () => {
        const closeFormBtn = document.querySelector('.close-taskForm-btn');
        renderProjectCard(Storage.projects);
        closeFormBtn.addEventListener('click', () => {
            submitButton.classList.remove('hide');
            editSubmitButton.classList.add('hide')
            editSubmitButton.removeEventListener('click',
                handleEdit
            )
        })
        setTaskFormData(task);
        taskFormContainer.classList.remove('hide'); 
        submitButton.classList.add('hide');
        editSubmitButton.classList.remove('hide')
        editSubmitButton.addEventListener('click', handleEdit
        , {once: true});
    })

    function handleEdit(e){
        e.preventDefault();
        const editData = getTaskFormData();
        handleEditTask(task, editData);
        taskFormContainer.classList.add('hide'); 
        submitButton.classList.remove('hide');
        editSubmitButton.classList.add('hide')
        setCurrentPage(editData.project)
         // Put in how you want page to render (TODO)
        displayPage(currentPage);
    }

    // View Content
    const viewButton = document.createElement('i');
    viewButton.className = "bi bi-eye-fill";

    // buttonDiv.appendChild(completeBtn);
    buttonDiv.appendChild(viewButton)
    buttonDiv.appendChild(deleteBtn);
    buttonDiv.appendChild(editBtn);
    card.appendChild(buttonDiv)
    return card;
}

function renderProjectCard(projects){
    const projectContainer = document.querySelector('.project-container');
    const projectList = document.querySelector('#project')
    projectList.innerHTML = '<option value="" disabled selected class="placeholder">--Select a project--</option>';
    projectContainer.innerHTML = '';
    projects.forEach(project => {
        projectContainer.appendChild(createProjectCard(project))
        // add to project list in task form
        const projectOption = document.createElement('option');
        projectOption.textContent = project.name;
        projectOption.value = project.name;
        projectList.appendChild(projectOption);
    });
}

// TODO Project render
function createProjectCard(project){
    const container = document.createElement('div');
    container.className = project.name;
    container.classList.add ('user-project');

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

    const projectRemoveButton = document.createElement('i');
    projectRemoveButton.className = 'bi bi-trash-fill';
    projectRemoveButton.classList.add('delete-project');
    projectRemoveButton.addEventListener('click', () => {
        Storage.deleteProject(project.name);
        renderTaskList(Storage.tasks);
        container.remove();
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
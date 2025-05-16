export function getTaskFormData(){
    return {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        dueDate: document.querySelector('#dueDate').value,
        priority: document.querySelector('input[name="priority"]:checked').value,
        project: document.querySelector('#project').value,
    }
}

export function setTaskFormData(task){
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
    let taskProject =  document.querySelector('#project');
    const projectOptions = taskProject.options;
    const matchProject =  Array.from(projectOptions).find(
        p => p.textContent === task.project
    );

    if (matchProject){
        matchProject.selected = true;
    } else {
        let placeholder = document.querySelector('option.placeholder');
        placeholder.selected = true;
    }
}

export function getProjectFormData(){
    return {
        name: document.querySelector('#projectName').value,
    }
}
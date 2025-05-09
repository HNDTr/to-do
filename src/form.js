// import { createTask, createProject} from "./create"


// let storage = {
//     projects: [],
//     tasks: []
// }

// // New Task Button
// const addTaskButton = document.querySelector('.submit-task');
// addTaskButton.addEventListener('click', (e) => {
//     e.preventDefault();

//     // Getting form values
//     const taskTitle = document.querySelector('#title').value;

//     const taskDesc = document.querySelector('#description').value;

//     const taskDate = document.querySelector('#dueDate').value;

//     const priority = document.querySelector('input[name="priority"]:checked').value;

//     const project = document.querySelector('#project').value;
//     const newTask = createTask(taskTitle, taskDesc, taskDate, priority, project);

//     // console.log(project)
//     // console.log("New Task:", newTask);

//     storage.tasks.push(newTask);

//     document.querySelector('.taskForm').reset();

// });


// export {storage}
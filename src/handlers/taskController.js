import { Task } from "../models/task.js";
import {Storage} from "../storage.js";

function handleNewTask({title, description, dueDate, priority, project}){
    const task = new Task(title, description, dueDate, priority, project);
    Storage.addTask(task);
    return task
}

function handleEditTask(task, {title, description, dueDate, priority, project}){
    const previousProject = task.project;
    task.edit(title, description, dueDate, priority, project);
    Storage.editTask(task.id, previousProject);
}



export {handleNewTask, handleEditTask}
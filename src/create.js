import { Task } from "./task.js"
import { Project } from "./project.js";

const createTask = (title, description, dueDate, priority, project) => {
    return new Task(title, description, dueDate, priority, project);
}

const createProject = (name) => {
    return new Project(name);
}


export {createTask, createProject}
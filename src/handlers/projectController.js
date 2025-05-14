import { Project } from "../models/project.js";
import {Storage} from "../storage.js";

function handleNewProject({name}){
    const project = new Project(name);
    Storage.addProject(project);
    return project
}

export {handleNewProject}

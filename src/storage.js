import { Project } from "./models/project";
import { Task } from "./models/task";

export const Storage = {
    projects: [],
    tasks: [],



    addProject(project) {
        this.projects.push(project);
        this.saveProjects()
    },

    addTask(task) {
        // add globally 
        this.tasks.push(task);
        this.saveTasks();
        // add to specific project if applicable
        if (task.project) {
            const project = this.projects.find(p => p.name === task.project);
            if (project) project.addTask(task);
            this.saveProjects();
        }
    },

    deleteTask(taskId) {
        // global 
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            const [task] = this.tasks.splice(index, 1);
            this.saveTasks();
            if (task.project) {
                // remove from specific project
                const project = this.projects.find(p => p.name === task.project);
                if (project) {
                    const projIndex = project.tasks.findIndex(t => t.id === taskId);
                    project.updateTasks(projIndex);
                    this.saveProjects();
                }
            }
        }
    },

    deleteProject(projectName) {
        const index = this.projects.findIndex(p => p.name === projectName);
        if (index !== -1){
            this.projects.splice(index, 1);
            this.saveProjects();
            // Remove all tasks associated with this project
            this.tasks = this.tasks.filter(task => task.project !== projectName);
            this.saveTasks();
        }
    }, 

    editTask(taskId, previousProject){
        // find globally
        const task = this.tasks.find(t => t.id === taskId);
        // when you edit you move to the new project, also remove from old project if it's associate to a project 
        if(previousProject){
            const preProject = this.projects.find(p => p.name === previousProject);
            const idx = preProject.tasks.findIndex(t => t.id === taskId);
            preProject.updateTasks(idx);
            this.saveProjects();
        } 
        // they could edit a task with no project
        if (task.project){
            const project = this.projects.find(p => p.name === task.project);
            project.addTask(task);
            this.saveProjects();
        }
        this.saveTasks();
    }, 

    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    },
    
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    loadTasks() {
        const raw = JSON.parse(localStorage.getItem('tasks')) || [];
        const tasks = this.rehydrateTasks(raw);
        this.tasks.push(...tasks); // Append to the existing array
        // return this.rehydrateTasks(raw);
    },

    loadProjects() {
        const raw = JSON.parse(localStorage.getItem('projects')) || [];
        const projects = this.rehydrateProjects(raw);
        this.projects.push(...projects); // Append to the existing array
        // return this.rehydrateProjects(raw);
    },

    rehydrateTasks(taskObjects) {
        return taskObjects.map(obj => {
            const task = new Task(obj.title, obj.description, obj.dueDate, obj.priority, obj.project);
            console.log(obj.complete);
            if (obj.complete) task.toggleComplete();
            return task;
        });
    },

    rehydrateProjects(projectObjects) {
        return projectObjects.map(obj => {
            const project = new Project(obj.name);
            project.setTasks(this.rehydrateTasks(obj.tasks));
            return project;
        });
    }
    
}



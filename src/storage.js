export const Storage = {
    projects: [],
    tasks: [],

    addProject(project) {
        this.projects.push(project);
    },

    addTask(task) {
        // add globally 
        this.tasks.push(task);
        // add to specific project if applicable
        if (task.project) {
            const project = this.projects.find(p => p.name === task.project);
            if (project) project.addTask(task);
        }
    },

    deleteTask(taskId) {
        // global 
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            const [task] = this.tasks.splice(index, 1);
            if (task.project) {
                // remove from specific project
                const project = this.projects.find(p => p.name === task.project);
                if (project) {
                    const projIndex = project.tasks.findIndex(t => t.id === taskId);
                    project.updateTasks(projIndex);
                }
            }
        }
    },

    deleteProject(projectName) {
        const index = this.projects.findIndex(p => p.name === projectName);
        if (index !== -1){
            this.projects.splice(index, 1);
            // Remove all tasks associated with this project
            this.tasks = this.tasks.filter(task => task.project !== projectName);
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
        } 
        // they could edit a task with no project
        if (task.project){
            const project = this.projects.find(p => p.name === task.project);
            project.addTask(task);
        }
    }
}



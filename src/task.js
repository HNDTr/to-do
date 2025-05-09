export class Task {

    #title;
    #description;
    #dueDate;
    #priority;
    #project;
    #complete = false;

    constructor(title, description, dueDate, priority, project){
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#project = project;
    }

    get complete(){
        return this.#complete;
    }

    toggleComplete(){
        this.#complete = !this.#complete;
    }

    get title(){
        return this.#title;
    }

    get description(){
        return this.#description;
    }

    get dueDate(){
        return this.#dueDate;
    }

    get priority(){
        return this.#priority;
    }
    
    get project(){
        return this.#project;
    }

    edit(title, description, dueDate, priority, project){
        if (title !== undefined){ this.#title = title}
        if (description !== undefined){ this.#description = description}
        if (dueDate !== undefined){ this.#dueDate = dueDate}
        if (priority !== undefined){ this.#priority = priority}
        if (project !== undefined){ this.#project = project}
    }
}
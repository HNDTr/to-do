export class Project {
    #name
    #tasks

    constructor (name){
        this.#name = name;
        this.#tasks = [];
    }

    get name() {
        return this.#name;
    }
    set name(name){
        this.#name = name;
    }

    get tasks(){
        return [...this.#tasks];
    }

    setTasks(tasksArray) {
        this.#tasks = tasksArray;
    }

    updateTasks(index){
        this.#tasks.splice(index, 1);
    }

    addTask(task){
        this.#tasks.push(task);
    }

    toJSON() {
        return {
            name: this.#name,
            tasks: this.#tasks
        };
    }
}
class Task {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.check = false;
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.taskList = [];
    }
    addTask (title, description, dueDate, priority, notes) {
        this.taskList.push(new Task(title, description, dueDate, priority, notes));
    }
}

/*
class Folder {
    constructor() {
        this.projectList = [];
    }
}
*/

const root = {
    projectList: [],
    addProject(name) {
        this.projectList.push(new Project(name));
    }
}

export { Task, Project, root };
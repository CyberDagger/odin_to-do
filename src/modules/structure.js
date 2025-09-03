import { renderProjects } from "./display";

class Task {
    constructor(title, dueDate, priority, notes) {
        this.title = title;
        this.dueDate = new Date(dueDate);
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
    addTask (title, dueDate, priority, notes) {
        this.taskList.push(new Task(title, dueDate, priority, notes));
    }
}

const root = {
    projectList: [],
    currentProject: null,
    addProject(name) {
        this.projectList.push(new Project(name));
        renderProjects();
    }
}

export { Task, Project, root };
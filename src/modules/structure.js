import { renderProjects, renderTasks, renderHeaderProject } from "./display";

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
        renderTasks(this);
    }
}

const root = {
    projectList: [],
    currentProject: null,
    addProject(name) {
        this.projectList.push(new Project(name));
        this.currentProject = this.projectList[this.projectList.length - 1];
        renderProjects();
        renderTasks(this.currentProject);
        renderHeaderProject();
    }
}

export { Task, Project, root };
import { renderProjects, renderTasks, renderHeaderProject, clearTasks } from "./display";

class Task {
    constructor(title, dueDate, priority, notes) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.notes = notes;
        this.check = false;
    }
    setTask(title, dueDate, priority, notes) {
        this.title = title;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.notes = notes;
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
    removeTask(taskID) {
        let taskIndex = this.taskList.map(i => i.title).indexOf(taskID);
        this.taskList.splice(taskIndex, 1);
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
    },
    deleteProject(projectName) {
        let projectIndex = this.projectList.map(i => i.name).indexOf(projectName);
        if (this.currentProject === this.projectList[projectIndex]) {
            this.currentProject = null;
        }
        this.projectList.splice(projectIndex, 1);
        renderProjects();
        if (this.currentProject != null) {
            renderTasks(this.currentProject);
        } else {
            clearTasks();
        }
        renderHeaderProject();
    }
}

export { Task, Project, root };
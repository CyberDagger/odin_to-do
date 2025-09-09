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
        this.id = crypto.randomUUID();
        this.name = name;
        this.taskList = [];
    }
    addTask (title, dueDate, priority, notes) {
        this.taskList.push(new Task(title, dueDate, priority, notes));
    }
    removeTask(taskID) {
        let taskIndex = this.taskList.findIndex(i => i.id === taskID);
        this.taskList.splice(taskIndex, 1);
    }
}

/*
const root = {
    projectList: [],
    currentProject: null,
    addProject(name) {
        this.projectList.push(new Project(name));
        this.currentProject = this.projectList[this.projectList.length - 1];
    },
    deleteProject(projectID) {
        let projectIndex = this.projectList.findIndex(i => i.id === projectID);
        if (this.currentProject === this.projectList[projectIndex]) {
            this.currentProject = null;
        }
        this.projectList.splice(projectIndex, 1);
    }
}
*/



class Directory {
    constructor() {
        this.projectList = [];
        this.currentProject = null;
    }
    addProject(name) {
        this.projectList.push(new Project(name));
        this.currentProject = this.projectList[this.projectList.length - 1];
    }
    deleteProject(projectID) {
        let projectIndex = this.projectList.findIndex(i => i.id === projectID);
        if (this.currentProject === this.projectList[projectIndex]) {
            this.currentProject = null;
        }
        this.projectList.splice(projectIndex, 1);
    }
}

function init() {
    let dir;
    if (localStorage.getItem("saved")) {
        dir = JSON.parse(localStorage.getItem("saved"));
        Object.setPrototypeOf(dir, Directory.prototype);
        if (dir.projectList.length > 0) {
            for (let i = 0; i < dir.projectList.length; i++) {
                Object.setPrototypeOf(dir.projectList[i], Project.prototype);
                if (dir.projectList[i].taskList.length > 0) {
                    for (let j = 0; j < dir.projectList[i].taskList.length; j++) {
                        console.log(dir.projectList[i].taskList[j]);
                        Object.setPrototypeOf(dir.projectList[i].taskList[j], Task.prototype);
                    }
                }
            }
        }
    } else {
        dir = new Directory()
        console.log("There is no saved data. Initializing new root object.");
    }
    return dir;
}

const root = init();

export { Task, Project, root };
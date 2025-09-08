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
        let taskIndex = this.taskList.map(i => i.id).indexOf(taskID);
        this.taskList.splice(taskIndex, 1);
    }
}

const root = {
    projectList: [],
    currentProject: null,
    addProject(name) {
        this.projectList.push(new Project(name));
        this.currentProject = this.projectList[this.projectList.length - 1];
    },
    deleteProject(projectID) {
        let projectIndex = this.projectList.map(i => i.id).indexOf(projectID);
        if (this.currentProject === this.projectList[projectIndex]) {
            this.currentProject = null;
        }
        this.projectList.splice(projectIndex, 1);
    }
}

export { Task, Project, root };
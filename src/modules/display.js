// Imports
import { root } from "./structure.js";


// DOM Aliases
const projectMenu = document.querySelector("#project-list");
const taskField = document.querySelector("#content");

const taskWindow = document.querySelector("#view-task");
const cardTitle = document.querySelector("#card-title");
const cardDate = document.querySelector("#card-date");
const cardPriority = document.querySelector("#card-priority");
const cardNotes = document.querySelector("#card-notes");
const cardCheck = document.querySelector("#card-check");
const btnCloseTask = document.querySelector("#button-close-task");

const newProject = document.querySelector("#new-project");
const btnNewProject = document.querySelector("#button-new-project");
const fieldProjectName = document.querySelector("#project-name");
const btnSubmitProject = document.querySelector("#new-project-submit");
const btnCancelProject = document.querySelector("#new-project-cancel");

const newTask = document.querySelector("#new-task");
const btnNewTask = document.querySelector("#button-new-task");

const fieldTaskPriority = document.querySelector("#task-priority");

fieldTaskPriority.addEventListener("change", function() {
    switch (this.value) {
        case "high":
            this.style.color = "red";
            break;
        case "medium":
            this.style.color = "orange";
            break;
        case "low":
            this.style.color = "green";
            break;
        default:
            this.style.color = "black";
    }
})

btnNewProject.addEventListener("click", () => newProject.showModal());
btnSubmitProject.addEventListener("click", (e) => {
    e.preventDefault();
    root.addProject(fieldProjectName.value);
    newProject.close();
});
btnCancelProject.addEventListener("click", () => newProject.close())

btnNewTask.addEventListener("click", () => newTask.showModal());

btnCloseTask.addEventListener("click", () => taskWindow.close());

function renderProjects() {
    projectMenu.innerHTML = "";
    for (let i = 0; i < root.projectList.length; i++) {
        let item = document.createElement("li");
        let itemButton = document.createElement("button");
        itemButton.textContent = root.projectList[i].name;
        itemButton.setAttribute("data-name", root.projectList[i].name);
        itemButton.addEventListener("click", (e) => selectProject(e.currentTarget.dataset.name));
        item.appendChild(itemButton);
        projectMenu.appendChild(item);
    }
}

function selectProject(projectName) {
    let project = root.projectList[root.projectList.map(i => i.name).indexOf(projectName)];
    root.currentProject = project;
    renderTasks(project);
}

function renderTasks(project) {
    clearTasks();

    for (let i = 0; i < project.taskList.length; i++) {
        let taskBlock = document.createElement("div");
        taskBlock.classList.add("task-block");
        taskBlock.setAttribute("data-title", project.taskList[i].title);
        
        // Title
        let taskTitle = document.createElement("p");
        taskTitle.textContent = project.taskList[i].title;
        taskBlock.appendChild(taskTitle);
        // Due Date
        let taskDate = document.createElement("p");
        taskDate.textContent = project.taskList[i].dueDate;
        taskBlock.appendChild(taskDate);
        // Priority
        let taskPriority = document.createElement("p");
        taskPriority.textContent = project.taskList[i].priority;
        taskBlock.appendChild(taskPriority);

        taskBlock.addEventListener("click", (e) => renderTaskWindow(project, e.currentTarget.dataset.title));
        //taskBlock.addEventListener("click", (e) => alert(e.currentTarget.dataset.title));
        taskField.appendChild(taskBlock);
    }
}

function clearTaskWindow() {
    cardTitle.innerHTML = "";
    cardDate.innerHTML = "";
    cardPriority.innerHTML = "";
    cardNotes.innerHTML = "";
    cardCheck.innerHTML = "";
}

function renderTaskWindow(project, taskName) {
    let task = project.taskList[project.taskList.map(i => i.title).indexOf(taskName)];
    clearTaskWindow();
    // Title
    let taskTitle = document.createElement("h1");
    taskTitle.textContent = task.title;
    cardTitle.appendChild(taskTitle);
    // Due Date
    let taskDate = document.createElement("p");
    taskDate.textContent = task.dueDate;
    cardDate.appendChild(taskDate);
    // Priority
    let taskPriority = document.createElement("p");
    taskPriority.textContent = task.priority;
    cardPriority.appendChild(taskPriority);
    // Notes
    let taskNotes = document.createElement("p");
    taskNotes.textContent = task.notes;
    cardNotes.appendChild(taskNotes);
    // Completion
    let taskCheck = document.createElement("p");
    taskCheck.textContent = task.check;
    cardCheck.appendChild(taskCheck);

    taskWindow.showModal();
}

function clearTasks() {
    taskField.innerHTML = "";
}

export { renderProjects };
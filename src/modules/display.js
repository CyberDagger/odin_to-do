/*---------*/
/* Imports */
/*---------*/

import { root } from "./structure.js";
import { format, isPast } from "date-fns";

/*-------------*/
/* DOM Aliases */
/*-------------*/

const projectMenu = document.querySelector("#project-list");
const taskField = document.querySelector("#content");

const taskWindow = document.querySelector("#view-task");
const cardTitle = document.querySelector("#card-title");
const cardDate = document.querySelector("#card-date");
const cardPriority = document.querySelector("#card-priority");
const cardNotes = document.querySelector("#card-notes");
const cardCheck = document.querySelector("#card-check");
const btnCloseTask = document.querySelector("#button-close-task");

const btnNewProject = document.querySelector("#button-new-project");
const newProject = document.querySelector("#new-project");
const fieldProjectName = document.querySelector("#new-project-name");
const btnSubmitProject = document.querySelector("#new-project-submit");
const btnCancelProject = document.querySelector("#new-project-cancel");

const renameProject = document.querySelector("#rename-project");
const fieldRenameProjectName = document.querySelector("#rename-project-name");
const btnSubmitRenameProject = document.querySelector("#rename-project-submit");
const btnCancelRenameProject = document.querySelector("#rename-project-cancel");

const headerProject = document.querySelector("#title-project");
const btnRenameProject = document.querySelector("#button-rename-project");
const btnNewTask = document.querySelector("#button-new-task");

const newTask = document.querySelector("#new-task");
const fieldTaskName = document.querySelector("#task-name");
const fieldTaskDate = document.querySelector("#task-date");
const fieldTaskPriority = document.querySelector("#task-priority");
const fieldTaskNotes = document.querySelector("#task-notes");
const btnSubmitTask = document.querySelector("#new-task-submit");
const btnCancelTask = document.querySelector("#new-task-cancel");

const editTask = document.querySelector("#edit-task");
const fieldEditTaskName = document.querySelector("#edit-task-name");
const fieldEditTaskDate = document.querySelector("#edit-task-date");
const fieldEditTaskPriority = document.querySelector("#edit-task-priority");
const fieldEditTaskNotes = document.querySelector("#edit-task-notes");
const btnSubmitEditTask = document.querySelector("#edit-task-submit");
const btnCancelEditTask = document.querySelector("#edit-task-cancel");

/*----------------*/
/* Event Handlers */
/*----------------*/

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
});
fieldTaskPriority.dispatchEvent(new Event("change"));

fieldEditTaskPriority.addEventListener("change", function() {
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
});

btnNewProject.addEventListener("click", () => newProject.showModal());
btnSubmitProject.addEventListener("click", (e) => {
    e.preventDefault();
    root.addProject(fieldProjectName.value);
    newProject.close();
});
btnCancelProject.addEventListener("click", () => newProject.close())

btnRenameProject.addEventListener("click", () => renameProject.showModal());
btnSubmitRenameProject.addEventListener("click", (e) => {
    e.preventDefault();
    root.currentProject.name = fieldRenameProjectName.value;
    renderProjects();
    renderHeaderProject();
    renameProject.close();
});
btnCancelRenameProject.addEventListener("click", () => renameProject.close())

btnNewTask.addEventListener("click", () => newTask.showModal());
btnSubmitTask.addEventListener("click", (e) => {
    e.preventDefault();
    root.currentProject.addTask(fieldTaskName.value, fieldTaskDate.value, fieldTaskPriority.value, fieldTaskNotes.value);
    newTask.close();
});
btnCancelTask.addEventListener("click", () => newTask.close())

btnCloseTask.addEventListener("click", () => taskWindow.close());

btnSubmitEditTask.addEventListener("click", (e) => {
    let task = root.currentProject.taskList[root.currentProject.taskList.map(i => i.title).indexOf(e.currentTarget.dataset.title)];
    task.setTask(fieldEditTaskName.value, fieldEditTaskDate.value, fieldEditTaskPriority.value, fieldEditTaskNotes.value);
    renderTasks(root.currentProject);
    editTask.close();
});
btnCancelEditTask.addEventListener("click", () => editTask.close());

/*------------------*/
/* Called Functions */
/*------------------*/

function renderProjects() {
    projectMenu.innerHTML = "";
    for (let i = 0; i < root.projectList.length; i++) {
        let item = document.createElement("li");
        let itemButton = document.createElement("button");
        itemButton.textContent = root.projectList[i].name;
        itemButton.setAttribute("data-name", root.projectList[i].name);
        itemButton.addEventListener("click", (e) => {
            selectProject(e.currentTarget.dataset.name);
            renderHeaderProject();
        });
        item.appendChild(itemButton);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-name", root.projectList[i].name);
        deleteButton.addEventListener("click", (e) => {
            root.deleteProject(e.currentTarget.dataset.name);
        })
        item.appendChild(deleteButton);
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
        let date = project.taskList[i].dueDate;
        taskDate.textContent = format(date, "dd/MM/yyyy");
        if (isPast(date)) {
            taskDate.classList.add("overdue");
        }
        taskBlock.appendChild(taskDate);
        // Priority
        let taskPriority = document.createElement("p");
        taskPriority.textContent = project.taskList[i].priority;
        taskBlock.appendChild(taskPriority);
        // Completed
        let taskCheck = document.createElement("p");
        taskCheck.textContent = project.taskList[i].check;
        taskBlock.appendChild(taskCheck);
        // Edit Button
        let taskEdit = document.createElement("button");
        taskEdit.textContent = "Edit";
        taskEdit.setAttribute("data-title", project.taskList[i].title);
        taskEdit.addEventListener("click", (e) => {
            e.stopPropagation();
            renderTaskEdit(project, e.currentTarget.dataset.title);
        });
        taskBlock.appendChild(taskEdit);
        // Delete Button
        let taskDelete = document.createElement("button");
        taskDelete.textContent = "Delete";
        taskDelete.setAttribute("data-title", project.taskList[i].title);
        taskDelete.addEventListener("click", (e) => {
            e.stopPropagation();
            root.currentProject.removeTask(e.currentTarget.dataset.title);
        });
        taskBlock.appendChild(taskDelete);

        taskBlock.addEventListener("click", (e) => renderTaskWindow(project, e.currentTarget.dataset.title));

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
    taskDate.textContent = format(task.dueDate, "dd/MM/yyyy");
    if (isPast(task.dueDate)) {
        taskDate.classList.add("overdue");
    }
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

function renderTaskEdit(project, taskName) {
    let task = project.taskList[project.taskList.map(i => i.title).indexOf(taskName)];
    //clearTaskWindow();

    // Title
    fieldEditTaskName.value = task.title;
    // Due Date
    fieldEditTaskDate.value = format(task.dueDate, "yyyy-MM-dd");
    // Priority
    fieldEditTaskPriority.value = task.priority;
    fieldEditTaskPriority.dispatchEvent(new Event("change"));
    // Notes
    fieldEditTaskNotes.value = task.notes;

    btnSubmitEditTask.setAttribute("data-title", task.title);

    editTask.showModal();
}

function clearTasks() {
    taskField.innerHTML = "";
}

function renderHeaderProject() {
    if (root.currentProject === null) {
        headerProject.textContent = "Select a project";
        btnRenameProject.disabled = true;
        btnNewTask.disabled = true;
    } else {
        headerProject.textContent = root.currentProject.name;
        btnRenameProject.disabled = false;
        btnNewTask.disabled = false;
    }
}

/*---------*/
/* Exports */
/*---------*/

export { renderProjects, renderTasks, clearTasks, renderHeaderProject };
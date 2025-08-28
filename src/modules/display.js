import { root } from "./structure.js";

const projectMenu = document.querySelector("#project-list");
const taskField = document.querySelector("#content");
const taskWindow = document.querySelector("#view-task");

function renderProjects() {
    for (let i = 0; i < root.projectList.length; i++) {
        let item = document.createElement("li");
        let itemButton = document.createElement("button");
        itemButton.textContent = root.projectList[i].name;
        itemButton.setAttribute("data-name", root.projectList[i].name);
        itemButton.addEventListener("click", (e) => renderTasks(e.currentTarget.dataset.name));
        item.appendChild(itemButton);
        projectMenu.appendChild(item);
    }
}

function renderTasks(projectName) {
    clearTasks();

    let project = root.projectList[root.projectList.map(i => i.name).indexOf(projectName)];
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

function renderTaskWindow(project, taskName) {
    let task = project.taskList[project.taskList.map(i => i.title).indexOf(taskName)];

    let taskTitle = document.createElement("p");
    taskTitle.textContent = task.title;
    taskWindow.appendChild(taskTitle);

    let taskDesc = document.createElement("p");
    taskDesc.textContent = task.description;
    taskWindow.appendChild(taskDesc);

    let taskDate = document.createElement("p");
    taskDate.textContent = task.dueDate;
    taskWindow.appendChild(taskDate);

    let taskPriority = document.createElement("p");
    taskPriority.textContent = task.priority;
    taskWindow.appendChild(taskPriority);

    let taskNotes = document.createElement("p");
    taskNotes.textContent = task.notes;
    taskWindow.appendChild(taskNotes);

    let taskCheck = document.createElement("p");
    taskCheck.textContent = task.check;
    taskWindow.appendChild(taskCheck);

    taskWindow.showModal();
}

function clearTasks() {
    taskField.innerHTML = "";
}

export { renderProjects };
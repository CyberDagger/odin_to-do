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
        itemButton.addEventListener("click", (e) => renderTasks(e.target.getAttribute("data-name")));
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

        //taskBlock.addEventListener("click", (e) => renderTaskWindow(project, e.target.getAttribute("data-title")));
        taskBlock.addEventListener("click", (e) => alert(e.target.getAttribute("data-title")));
        taskField.appendChild(taskBlock);
    }
}

function renderTaskWindow(project, taskName) {
    alert(taskName);
    let task = project.taskList[project.taskList.map(i => i.name).indexOf(taskName)];

    let taskTitle = document.createElement("p");
    //taskTitle.textContent = project.taskList[task].title;
    taskTitle.textContent = task;
    taskWindow.appendChild(taskTitle);

    taskWindow.showModal();
}

function clearTasks() {
    taskField.innerHTML = "";
}

export { renderProjects };
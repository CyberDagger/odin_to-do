import "./reset.css";
import "./styles.css";

import { Task, Project, root } from "./structure.js";

const projectMenu = document.querySelector("#project-list");

let testTask = new Task("Test Task", "This is a task.", "02/05/2025", "High", "");
console.log(testTask);

root.addProject("Project 1");
root.addProject("Project 2");
root.addProject("Project 3");
console.log(root.projectList);

function renderProjects() {
    for (let i = 0; i < root.projectList.length; i++) {
        let item = document.createElement("li");
        item.textContent = root.projectList[i].name;
        projectMenu.appendChild(item);
    }
}

renderProjects();
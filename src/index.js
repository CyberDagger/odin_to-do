import "./reset.css";
import "./styles.css";

import { Task, Project, root } from "./modules/structure.js";
import { renderProjects } from "./modules/ui/sidebar.js";
import { clearTasks } from "./modules/ui/taskArea.js";
import { renderHeaderProject } from "./modules/ui/header.js";

const btnPopulate = document.querySelector("#button-populate");
const btnSave = document.querySelector("#button-save");
const btnLoad = document.querySelector("#button-load");

btnPopulate.addEventListener("click", () => {
    root.addProject("Project 1");
    root.addProject("Project 2");
    root.addProject("Project 3");

    root.projectList[0].addTask("Test Task 1", "02/05/2025", "high", "Note 1");
    root.projectList[0].addTask("Test Task 2", "11/05/2025", "high", "Note 2");
    root.projectList[0].addTask("Test Task 3", "02/05/2025", "low", "Note 3");
    root.projectList[1].addTask("Test Task 4", "02/05/2025", "high", "Note 4");
    root.projectList[1].addTask("Test Task 5", "02/05/2025", "high", "Note 5");
    root.projectList[2].addTask("Test Task 6", "11/05/2025", "high", "Note 6");

    root.projectList[0].taskList[1].check = true;

    clearTasks();
    renderProjects();
    root.currentProject = null;
    renderHeaderProject();

    console.log(JSON.stringify(root));
})

btnSave.addEventListener("click", () => {
    localStorage.setItem("saved", JSON.stringify(root));
})

btnLoad.addEventListener("click", () => {
    let root = JSON.parse(localStorage.getItem("saved"));
    console.log(root);
})

clearTasks();
renderProjects();
root.currentProject = null;
renderHeaderProject();
console.log(root);
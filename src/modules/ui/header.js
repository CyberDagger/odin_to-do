import { root } from "../structure.js";
import { renderRenameProject } from "./modal_renameProject.js";
import { renderNewTask } from "./modal_newTask.js";

const headerProject = document.querySelector("#title-project");
const btnRenameProject = document.querySelector("#button-rename-project");
const btnNewTask = document.querySelector("#button-new-task");

btnRenameProject.addEventListener("click", () => renderRenameProject());

btnNewTask.addEventListener("click", () => renderNewTask());

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

export { renderHeaderProject };
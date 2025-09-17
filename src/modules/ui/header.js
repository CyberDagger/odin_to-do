import { root } from "../structure.js";
import { renderNewTask } from "./modal_newTask.js";

const headerProject = document.querySelector("#title-project");
const btnNewTask = document.querySelector("#button-new-task");

btnNewTask.addEventListener("click", () => renderNewTask());

function renderHeaderProject() {
    if (root.currentProject === null) {
        headerProject.textContent = "Select a project";
        btnNewTask.disabled = true;
    } else {
        headerProject.textContent = root.currentProject.name;
        btnNewTask.disabled = false;
    }
}

export { renderHeaderProject };
import { root } from "../structure.js";
import { renderProjects } from "./sidebar.js";
import { renderHeaderProject } from "./header.js";
import { renderTasks } from "./taskArea.js";

const deleteProjectWindow = document.querySelector("#delete-project");
const deleteProjectBlurb = document.querySelector("#delete-project-blurb");
const deleteProjectConfirm = document.querySelector("#delete-project.confirm");
const deleteProjectCancel = document.querySelector("#delete-project-cancel");
const deleteProjectClose = document.querySelector("#delete-project-close");

function renderDeleteProject() {
    deleteProjectWindow.showModal();
}

export { renderDeleteProject };
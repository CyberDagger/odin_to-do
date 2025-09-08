import { root } from "../structure.js";
import { renderProjects } from "./sidebar.js";
import { renderHeaderProject } from "./header.js";

const renameProject = document.querySelector("#rename-project");
const renameProjectForm = document.querySelector("#rename-project-card");
const fieldRenameProjectName = document.querySelector("#rename-project-name");
const btnCancelRenameProject = document.querySelector("#rename-project-cancel");

function renderRenameProject() {
    renameProject.showModal();
}

renameProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    root.currentProject.name = fieldRenameProjectName.value;
    renderProjects();
    renderHeaderProject();
    renameProject.close();
});

btnCancelRenameProject.addEventListener("click", () => renameProject.close())

export { renderRenameProject };
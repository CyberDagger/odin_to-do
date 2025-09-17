import { root } from "../structure.js";
import { renderProjects } from "./sidebar.js";
import { renderHeaderProject } from "./header.js";

const renameProject = document.querySelector("#rename-project");
const renameProjectForm = document.querySelector("#rename-project-card");
const fieldRenameProjectName = document.querySelector("#rename-project-name");
const btnCancelRenameProject = document.querySelector("#rename-project-cancel");

function renderRenameProject(projectID) {
    renameProjectForm.setAttribute("data-id", projectID);
    renameProject.showModal();
}

renameProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let projectID = renameProjectForm.dataset.id;
    let project = root.projectList.find(i => i.id === projectID);
    project.name = fieldRenameProjectName.value;
    localStorage.setItem("saved", JSON.stringify(root));
    renderProjects();
    renderHeaderProject();
    renameProject.close();
});

btnCancelRenameProject.addEventListener("click", () => renameProject.close())

export { renderRenameProject };
import { root } from "../structure.js";
import { renderProjects } from "./sidebar.js";
import { renderHeaderProject } from "./header.js";
import { renderTasks } from "./taskArea.js";

const newProject = document.querySelector("#new-project");
const newProjectForm = document.querySelector("#new-project-card")
const fieldProjectName = document.querySelector("#new-project-name");
const btnCancelProject = document.querySelector("#new-project-cancel");

function renderNewProject() {
    newProject.showModal();
}

newProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    root.addProject(fieldProjectName.value);
    localStorage.setItem("saved", JSON.stringify(root));
    renderProjects();
    renderTasks(root.currentProject);
    renderHeaderProject();
    newProject.close();
});

btnCancelProject.addEventListener("click", () => newProject.close());

export { renderNewProject };
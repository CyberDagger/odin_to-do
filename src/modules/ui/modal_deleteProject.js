import { root } from "../structure.js";
import { renderProjects } from "./sidebar.js";
import { renderHeaderProject } from "./header.js";
import { renderTasks } from "./taskArea.js";

const deleteProjectWindow = document.querySelector("#delete-project");
const deleteProjectBlurb = document.querySelector("#delete-project-blurb");
const deleteProjectConfirm = document.querySelector("#delete-project-confirm");
const deleteProjectCancel = document.querySelector("#delete-project-cancel");
const deleteProjectClose = document.querySelector("#delete-project-close");

function renderDeleteProject(projectID) {
    deleteProjectConfirm.setAttribute("data-id", projectID);
    let project = root.projectList.find(i => i.id === projectID);
    deleteProjectBlurb.textContent = "This will delete " + project.name +".";
    deleteProjectWindow.showModal();
}

deleteProjectConfirm.addEventListener("click", (e) => {
    root.deleteProject(e.currentTarget.dataset.id);
    localStorage.setItem("saved", JSON.stringify(root));
    renderProjects();
    renderHeaderProject();
    renderTasks(root.currentProject);
    deleteProjectWindow.close();
});

deleteProjectCancel.addEventListener("click", () => deleteProjectWindow.close());

deleteProjectClose.addEventListener("click", () => deleteProjectWindow.close());

export { renderDeleteProject };
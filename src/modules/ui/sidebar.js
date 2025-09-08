import { root } from "../structure.js";
import { renderNewProject } from "./modal_newProject.js";
import { renderHeaderProject } from "./header.js";
import { renderTasks } from "./taskArea.js";

const btnNewProject = document.querySelector("#button-new-project");
const projectMenu = document.querySelector("#project-list");

btnNewProject.addEventListener("click", () => renderNewProject());

function renderProjects() {
    projectMenu.innerHTML = "";
    for (let i = 0; i < root.projectList.length; i++) {
        let item = document.createElement("li");
        let itemButton = document.createElement("button");
        itemButton.textContent = root.projectList[i].name;
        itemButton.setAttribute("data-id", root.projectList[i].id);
        itemButton.addEventListener("click", (e) => {
            selectProject(e.currentTarget.dataset.id);
            renderHeaderProject();
        });
        item.appendChild(itemButton);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-name", root.projectList[i].name);
        deleteButton.addEventListener("click", (e) => {
            root.deleteProject(e.currentTarget.dataset.id);
            renderProjects();
            renderTasks(root.currentProject);
            renderHeaderProject();
        })
        item.appendChild(deleteButton);
        projectMenu.appendChild(item);
    }
}

function selectProject(projectID) {
    let project = root.projectList.find(i => i.id === projectID);
    root.currentProject = project;
    renderTasks(project);
}

export { renderProjects };
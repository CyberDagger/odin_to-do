import { root } from "../structure.js";
import { renderNewProject } from "./modal_newProject.js";
import { renderHeaderProject } from "./header.js";
import { renderTasks } from "./taskArea.js";
import { renderRenameProject } from "./modal_renameProject.js";
import { renderDeleteProject} from "./modal_deleteProject.js";

const btnNewProject = document.querySelector("#button-new-project");
const projectMenu = document.querySelector("#project-list");

btnNewProject.addEventListener("click", () => renderNewProject());

function renderProjects() {
    projectMenu.innerHTML = "";
    for (let i = 0; i < root.projectList.length; i++) {
        let item = document.createElement("li");
        let itemButton = document.createElement("button");
        itemButton.textContent = root.projectList[i].name;
        itemButton.classList.add("project-select");
        itemButton.setAttribute("data-id", root.projectList[i].id);
        itemButton.addEventListener("click", (e) => {
            selectProject(e.currentTarget.dataset.id);
            renderHeaderProject();
        });
        item.appendChild(itemButton);

        let editButton = document.createElement("button");
        editButton.classList.add("project-edit");
        editButton.setAttribute("data-id", root.projectList[i].id);
        editButton.addEventListener("click", (e) => {
            renderRenameProject(e.currentTarget.dataset.id);
            localStorage.setItem("saved", JSON.stringify(root));
            renderProjects();
            renderTasks(root.currentProject);
            renderHeaderProject();
        })
        item.appendChild(editButton);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("project-delete");
        deleteButton.setAttribute("data-id", root.projectList[i].id);
        deleteButton.addEventListener("click", (e) => {
            renderDeleteProject();
            //root.deleteProject(e.currentTarget.dataset.id);
            //localStorage.setItem("saved", JSON.stringify(root));
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
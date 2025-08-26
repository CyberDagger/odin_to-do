import { root } from "./structure.js";

const projectMenu = document.querySelector("#project-list");

function renderProjects() {
    for (let i = 0; i < root.projectList.length; i++) {
        let item = document.createElement("li");
        item.textContent = root.projectList[i].name;
        projectMenu.appendChild(item);
    }
}

export { renderProjects };
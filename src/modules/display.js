import { root } from "./structure.js";

const projectMenu = document.querySelector("#project-list");

function renderProjects() {
    for (let i = 0; i < root.projectList.length; i++) {
        let item = document.createElement("li");
        let itemButton = document.createElement("button");
        itemButton.textContent = root.projectList[i].name;
        item.appendChild(itemButton);
        projectMenu.appendChild(item);
    }
}

export { renderProjects };
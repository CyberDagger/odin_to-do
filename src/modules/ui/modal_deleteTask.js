import { root } from "../structure.js";
import { renderProjects } from "./sidebar.js";
import { renderHeaderProject } from "./header.js";
import { renderTasks } from "./taskArea.js";

const deleteTaskWindow = document.querySelector("#delete-task");
const deleteTaskBlurb = document.querySelector("#delete-task-blurb");
const deleteTaskConfirm = document.querySelector("#delete-task-confirm");
const deleteTaskCancel = document.querySelector("#delete-task-cancel");
const deleteTaskClose = document.querySelector("#delete-task-close");

function renderDeleteTask(project, taskID) {
    deleteTaskConfirm.setAttribute("data-id-project", project.id);
    deleteTaskConfirm.setAttribute("data-id-task", taskID);

    let task = project.taskList.find(i => i.id === taskID);

    deleteTaskBlurb.textContent = "This will delete " + task.title + " from project " + project.name + ".";
    deleteTaskWindow.showModal();
}

deleteTaskConfirm.addEventListener("click", (e) => {
    let project = root.projectList.find(i => i.id === e.currentTarget.dataset.idProject);

    project.removeTask(e.currentTarget.dataset.idTask);

    localStorage.setItem("saved", JSON.stringify(root));

    renderTasks(root.currentProject);
    deleteTaskWindow.close();
});

deleteTaskCancel.addEventListener("click", () => deleteTaskWindow.close());

deleteTaskClose.addEventListener("click", () => deleteTaskWindow.close());

export { renderDeleteTask };
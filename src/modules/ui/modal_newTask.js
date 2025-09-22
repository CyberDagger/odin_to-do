import { root } from "../structure.js";
import { renderTasks } from "./taskArea.js";

const newTask = document.querySelector("#new-task");
const newTaskSubmit = document.querySelector("#new-task-card");
const fieldTaskName = document.querySelector("#task-name");
const fieldTaskDate = document.querySelector("#task-date");
const fieldTaskPriority = document.querySelector("#task-priority");
const fieldTaskNotes = document.querySelector("#task-notes");
const btnCancelTask = document.querySelector("#new-task-cancel");

fieldTaskPriority.addEventListener("change", function() {
    switch (this.value) {
        case "high":
            this.style.color = "red";
            break;
        case "medium":
            this.style.color = "orange";
            break;
        case "low":
            this.style.color = "green";
            break;
        default:
            this.style.color = "black";
    }
});
fieldTaskPriority.dispatchEvent(new Event("change"));

function renderNewTask() {
    fieldTaskName.value = "";
    fieldTaskDate.value = "";
    fieldTaskPriority.value = "high";
    fieldTaskPriority.dispatchEvent(new Event("change"));
    fieldTaskNotes.value = "";
    newTask.showModal();
}

newTaskSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    root.currentProject.addTask(fieldTaskName.value, fieldTaskDate.value, fieldTaskPriority.value, fieldTaskNotes.value);
    localStorage.setItem("saved", JSON.stringify(root));
    renderTasks(root.currentProject);
    newTask.close();
});

btnCancelTask.addEventListener("click", () => newTask.close());

export { renderNewTask };
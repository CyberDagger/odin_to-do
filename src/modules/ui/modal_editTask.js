import { root } from "../structure.js";
import { format } from "date-fns";
import { renderTasks } from "./taskArea.js";

const editTask = document.querySelector("#edit-task");
const editTaskSubmit = document.querySelector("#edit-task-card");
const fieldEditTaskName = document.querySelector("#edit-task-name");
const fieldEditTaskDate = document.querySelector("#edit-task-date");
const fieldEditTaskPriority = document.querySelector("#edit-task-priority");
const fieldEditTaskNotes = document.querySelector("#edit-task-notes");
const btnCancelEditTask = document.querySelector("#edit-task-cancel");

fieldEditTaskPriority.addEventListener("change", function() {
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

editTaskSubmit.addEventListener("submit", (e) => {
    e.preventDefault();
    let task = root.currentProject.taskList.find(i => i.id === e.currentTarget.dataset.id);
    task.setTask(fieldEditTaskName.value, fieldEditTaskDate.value, fieldEditTaskPriority.value, fieldEditTaskNotes.value);
    localStorage.setItem("saved", JSON.stringify(root));
    renderTasks(root.currentProject);
    editTask.close();
});

btnCancelEditTask.addEventListener("click", () => editTask.close());

function renderTaskEdit(project, taskID) {
    let task = project.taskList.find(i => i.id === taskID);

    // Title
    fieldEditTaskName.value = task.title;
    // Due Date
    fieldEditTaskDate.value = format(task.dueDate, "yyyy-MM-dd");
    // Priority
    fieldEditTaskPriority.value = task.priority;
    fieldEditTaskPriority.dispatchEvent(new Event("change"));
    // Notes
    fieldEditTaskNotes.value = task.notes;

    editTaskSubmit.setAttribute("data-id", task.id);

    editTask.showModal();
}

export { renderTaskEdit };
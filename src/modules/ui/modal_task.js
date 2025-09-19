import { format, isPast } from "date-fns";
import { root } from "../structure.js";
import { renderTasks } from "./taskArea";

const taskWindow = document.querySelector("#view-task");
const taskContent = document.querySelector("#task-card");
const cardTitle = document.querySelector("#card-title");
const cardDate = document.querySelector("#card-date");
const cardPriority = document.querySelector("#card-priority");
const cardNotes = document.querySelector("#card-notes");
const cardCheck = document.querySelector("#card-check");
const btnCloseTask = document.querySelector("#button-close-task");

btnCloseTask.addEventListener("click", () => taskWindow.close());

cardCheck.addEventListener("click", (e) => {
    let taskID = e.currentTarget.dataset.id;
    let task = root.currentProject.taskList.find(i => i.id === taskID);
    task.check = !task.check;
    if (task.check) {
        taskContent.classList.add("completed");
    } else {
        taskContent.classList.remove("completed");
    }
    renderTasks(root.currentProject);
})

function clearTaskWindow() {
    cardTitle.innerHTML = "";
    cardDate.innerHTML = "";
    cardPriority.innerHTML = "";
    cardNotes.innerHTML = "";
    cardCheck.innerHTML = "";
}

function renderTaskWindow(project, taskID) {
    let task = project.taskList.find(i => i.id === taskID);
    clearTaskWindow();
    // Title
    
    cardTitle.textContent = task.title;
    switch (task.priority) {
        case "low":
            cardTitle.classList.add("task-title-low");
            cardTitle.classList.remove("task-title-medium");
            cardTitle.classList.remove("task-title-high");
            break;
        case "medium":
            cardTitle.classList.remove("task-title-low");
            cardTitle.classList.add("task-title-medium");
            cardTitle.classList.remove("task-title-high");
            break;
        case "high":
            cardTitle.classList.remove("task-title-low");
            cardTitle.classList.remove("task-title-medium");
            cardTitle.classList.add("task-title-high");
            break;
    }
    
    // Due Date
    cardDate.textContent = "Due date: " + format(task.dueDate, "dd/MM/yyyy");
    if (isPast(task.dueDate)) {
        cardDate.textContent += " *OVERDUE*";
        cardDate.classList.add("overdue");
    } else {
        cardDate.classList.remove("overdue");
    }

    // Priority
    let textPriority = task.priority.charAt(0).toUpperCase() +task.priority.slice(1);
    cardPriority.textContent = "Priority: " + textPriority;
    
    // Notes
    cardNotes.textContent = task.notes;
    
    // Completion
    cardCheck.setAttribute("data-id", task.id);
    if (task.check) {
        cardCheck.checked = true;
    } else {
        cardCheck.checked = false;
    }
    
    if (task.check) {
        taskContent.classList.add("completed");
    } else {
        taskContent.classList.remove("completed");
    }
    taskWindow.showModal();
}

export { renderTaskWindow };
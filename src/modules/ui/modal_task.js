import { format, isPast } from "date-fns";

const taskWindow = document.querySelector("#view-task");
const cardTitle = document.querySelector("#card-title");
const cardDate = document.querySelector("#card-date");
const cardPriority = document.querySelector("#card-priority");
const cardNotes = document.querySelector("#card-notes");
const cardCheck = document.querySelector("#card-check");
const btnCloseTask = document.querySelector("#button-close-task");

btnCloseTask.addEventListener("click", () => taskWindow.close());

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
    let taskTitle = document.createElement("h1");
    taskTitle.textContent = task.title;
    cardTitle.appendChild(taskTitle);
    // Due Date
    let taskDate = document.createElement("p");
    taskDate.textContent = format(task.dueDate, "dd/MM/yyyy");
    if (isPast(task.dueDate)) {
        taskDate.classList.add("overdue");
    }
    cardDate.appendChild(taskDate);
    // Priority
    let taskPriority = document.createElement("p");
    taskPriority.textContent = task.priority;
    cardPriority.appendChild(taskPriority);
    // Notes
    let taskNotes = document.createElement("p");
    taskNotes.textContent = task.notes;
    cardNotes.appendChild(taskNotes);
    // Completion
    let taskCheck = document.createElement("p");
    taskCheck.textContent = task.check;
    cardCheck.appendChild(taskCheck);
    if (task.check) {
        taskWindow.classList.add("completed");
    } else {
        taskWindow.classList.remove("completed");
    }
    taskWindow.showModal();
}

export { renderTaskWindow };
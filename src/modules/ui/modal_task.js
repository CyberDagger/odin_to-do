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
    
    cardTitle.textContent = task.title;
    switch (task.priority) {
        case "low":
            cardTitle.style.backgroundColor = "green";
            break;
        case "medium":
            cardTitle.style.backgroundColor = "orange";
            break;
        case "high":
            cardTitle.style.backgroundColor = "red";
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
    cardCheck.textContent = task.check;
    
    if (task.check) {
        taskWindow.classList.add("completed");
    } else {
        taskWindow.classList.remove("completed");
    }
    taskWindow.showModal();
}

export { renderTaskWindow };
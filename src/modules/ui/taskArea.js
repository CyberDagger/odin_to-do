import { root } from "../structure.js";
import { format, isPast } from "date-fns";
import { renderTaskWindow } from "./modal_task.js";
import { renderTaskEdit } from "./modal_editTask.js";

const taskField = document.querySelector("#content");

function clearTasks() {
    taskField.innerHTML = "";
}

function renderTasks(project) {
    clearTasks();

    if (root.currentProject != null) {
        for (let i = 0; i < project.taskList.length; i++) {
            let taskBlock = document.createElement("div");
            taskBlock.classList.add("task-block");
            taskBlock.setAttribute("data-id", project.taskList[i].id);
            
            // Title
            let taskTitle = document.createElement("p");
            taskTitle.textContent = project.taskList[i].title;
            taskBlock.appendChild(taskTitle);
            // Due Date
            let taskDate = document.createElement("p");
            let date = project.taskList[i].dueDate;
            taskDate.textContent = format(date, "dd/MM/yyyy");
            if (isPast(date)) {
                taskDate.classList.add("overdue");
            }
            taskBlock.appendChild(taskDate);
            // Priority
            let taskPriority = document.createElement("p");
            taskPriority.textContent = project.taskList[i].priority;
            taskBlock.appendChild(taskPriority);
            // Completed
            let taskCheck = document.createElement("input");
            taskCheck.type = "checkbox";
            if (project.taskList[i].check) {
                taskCheck.checked = true;
            }
            taskCheck.addEventListener("click", (e) => {
                e.stopPropagation();
            })
            taskBlock.appendChild(taskCheck);
            // Edit Button
            let taskEdit = document.createElement("button");
            taskEdit.textContent = "Edit";
            taskEdit.setAttribute("data-id", project.taskList[i].id);
            taskEdit.addEventListener("click", (e) => {
                e.stopPropagation();
                renderTaskEdit(project, e.currentTarget.dataset.id);
            });
            taskBlock.appendChild(taskEdit);
            // Delete Button
            let taskDelete = document.createElement("button");
            taskDelete.textContent = "Delete";
            taskDelete.setAttribute("data-id", project.taskList[i].id);
            taskDelete.addEventListener("click", (e) => {
                e.stopPropagation();
                root.currentProject.removeTask(e.currentTarget.dataset.id);
                renderTasks(root.currentProject);
            });
            taskBlock.appendChild(taskDelete);

            taskBlock.addEventListener("click", (e) => renderTaskWindow(project, e.currentTarget.dataset.id));

            taskField.appendChild(taskBlock);
        }
    }
}

export { renderTasks, clearTasks };
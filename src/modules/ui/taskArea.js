import { root } from "../structure.js";
import { format, isPast } from "date-fns";
import { renderTaskWindow } from "./modal_task.js";
import { renderTaskEdit } from "./modal_editTask.js";

import img_priorityLow from "../../assets/images/priority_low.svg";
import img_priorityMed from "../../assets/images/priority_med.svg";
import img_priorityHigh from "../../assets/images/priority_high.svg";

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
            let taskTitle = document.createElement("h2");
            taskTitle.textContent = project.taskList[i].title;
            taskTitle.classList.add("block-title");
            taskBlock.appendChild(taskTitle);
            // Priority
            let taskPriority = document.createElement("div");
            taskPriority.classList.add("block-priority");
            switch (project.taskList[i].priority) {
                case "low":
                    taskPriority.classList.add("block-priority-low");
                    break;
                case "medium":
                    taskPriority.classList.add("block-priority-medium");
                    break;
                case "high":
                    taskPriority.classList.add("block-priority-high");
                    break;
            }
            if (project.taskList[i].check) {
                taskPriority.classList.add("completed");
            }
            taskBlock.appendChild(taskPriority);
            // Due Date
            let taskDate = document.createElement("p");
            taskDate.classList.add("block-date");
            let date = project.taskList[i].dueDate;
            taskDate.textContent = format(date, "dd/MM/yyyy");
            if (isPast(date)) {
                taskDate.classList.add("overdue");
            }
            taskBlock.appendChild(taskDate);
            
            // Completed
            let taskCheck = document.createElement("input");
            taskCheck.type = "checkbox";
            taskCheck.classList.add("check-complete");
            if (project.taskList[i].check) {
                taskCheck.checked = true;
            }
            taskCheck.addEventListener("click", (e) => {
                e.stopPropagation();
                project.taskList[i].check = !project.taskList[i].check;
                renderTasks(project);
            })
            taskBlock.appendChild(taskCheck);

            //Buttons
            let taskButtons = document.createElement("div");
            taskButtons.classList.add("block-buttons");
            // Edit Button
            let taskEdit = document.createElement("button");
            taskEdit.classList.add("block-button-edit");
            taskEdit.setAttribute("data-id", project.taskList[i].id);
            taskEdit.addEventListener("click", (e) => {
                e.stopPropagation();
                renderTaskEdit(project, e.currentTarget.dataset.id);
            });
            taskButtons.appendChild(taskEdit);
            // Delete Button
            let taskDelete = document.createElement("button");
            taskDelete.classList.add("block-button-delete");
            taskDelete.setAttribute("data-id", project.taskList[i].id);
            taskDelete.addEventListener("click", (e) => {
                e.stopPropagation();
                root.currentProject.removeTask(e.currentTarget.dataset.id);
                localStorage.setItem("saved", JSON.stringify(root));
                renderTasks(root.currentProject);
            });
            taskButtons.appendChild(taskDelete);
            taskBlock.appendChild(taskButtons);

            if (project.taskList[i].check) {
                taskBlock.classList.add("completed");
            }

            taskBlock.addEventListener("click", (e) => renderTaskWindow(project, e.currentTarget.dataset.id));

            taskField.appendChild(taskBlock);
        }
    }
}

export { renderTasks, clearTasks };
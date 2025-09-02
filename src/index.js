import "./reset.css";
import "./styles.css";

import { Task, Project, root } from "./modules/structure.js";
import { renderProjects } from "./modules/display.js";

let testTask = new Task("Test Task", "This is a task.", "02/05/2025", "High", "");
console.log(testTask);

root.addProject("Project 1");
root.addProject("Project 2");
root.addProject("Project 3");
console.log(root.projectList);

root.projectList[0].addTask("Test Task 1", "02/05/2025", "High", "Note 1");
root.projectList[0].addTask("Test Task 2", "02/05/2025", "High", "Note 2");
root.projectList[0].addTask("Test Task 3", "02/05/2025", "High", "Note 3");

renderProjects();
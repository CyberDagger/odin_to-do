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

renderProjects();
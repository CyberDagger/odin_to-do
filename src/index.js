import "./reset.css";
import "./styles.css";

import { Task, Project, root } from "./modules/structure.js";
import { renderProjects } from "./modules/ui/sidebar.js";
import { clearTasks } from "./modules/ui/taskArea.js";
import { renderHeaderProject } from "./modules/ui/header.js";

const btnPopulate = document.querySelector("#button-populate");

clearTasks();
renderProjects();
root.currentProject = null;
renderHeaderProject();
console.log(root);
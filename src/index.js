import "./reset.css";
import "./styles.css";

import { Task, Project, root } from "./modules/structure.js";
import { renderProjects } from "./modules/ui/sidebar.js";
import { clearTasks } from "./modules/ui/taskArea.js";
import { renderHeaderProject } from "./modules/ui/header.js";
import { renderTasks } from "./modules/ui/taskArea.js";

clearTasks();
renderProjects();
root.currentProject = null;
renderHeaderProject();
renderTasks(root.currentProject);
console.log(root);
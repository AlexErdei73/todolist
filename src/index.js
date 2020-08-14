import { ToDo } from './todo.js';
import { Project, Projects } from './projects.js';
import { DisplayList } from './displaylist.js';

const allProjects = new Projects();
const defProject = new Project('daily routine');
allProjects.add(defProject);
defProject.new();
const todos = document.querySelector('.todos');
const projectDisplay = new DisplayList(todos, defProject);
projectDisplay.render();

import { Project } from './projects.js';
import { DisplayList } from './displaylist.js';

//const allProjects = new Projects();
const defProject = new Project('daily routine');
//allProjects.add(defProject);
const divTodos = document.querySelector('.todos');
const projectDisplay = new DisplayList(divTodos, defProject);
projectDisplay.render();

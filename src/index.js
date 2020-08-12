import { ToDo } from './todo.js';
import { Project, Projects } from './projects.js';
import { display } from './displaytodo.js';

const allProjects = new Projects();
const defProject = new Project('daily routine');
allProjects.add(defProject);
const trialTodo = new ToDo('Brush Your Teeth');
trialTodo.description = 'After you woke up, it is very important to brush your teeth.' +
                        'Do it imediately after getting out of bed.';
trialTodo.dueDate = new Date("2020-08-12");
trialTodo.priority = 'low';
trialTodo.notes = ['You must do it for at least 3 minutes.',
                   'You should do it after eating sweets too.'];
display(trialTodo);


import { Projects } from './projects.js';
import { todos } from './sampletodos.js';
import { storage } from './storage.js';

function createSampleProject() {
    const sampleProject = allProjects.createItem();
    sampleProject.title = 'ToDoList';
    todos.forEach(item => {
        sampleProject.push(item);
    });
    sampleProject.active = 0;
}

export const allProjects = new Projects('allProjects');

if (localStorage.getItem('.length')) storage.load('', allProjects)
    else createSampleProject();

allProjects.display.output(allProjects);
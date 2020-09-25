import { Projects } from './projects.js';
import { todos } from './sampletodos.js';

function createSampleProject() {
    const sampleProject = allProjects.createItem();
    sampleProject.title = 'ToDoList';
    todos.forEach(item => {
        sampleProject.list.add(item);
    });
    sampleProject.active = 0;
}

export const allProjects = new Projects('allProjects');
if (localStorage.getItem('.length')) {
    allProjects.load('');
} else {
    createSampleProject();
}
allProjects.display.items = allProjects;
allProjects.output();
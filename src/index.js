import { Projects } from './projects.js';

export const allProjects = new Projects('allProjects');
if (localStorage.getItem('.length')) {
    allProjects.load('');
}
allProjects.output();
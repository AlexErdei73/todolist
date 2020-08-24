import { ToDo } from './todo.js';

const todoObject = new ToDo('Todo object');
todoObject.description = 'First thing to make the Todo object, which stores the data for the todo item.';
todoObject.priority = 'low';

const todoDisplay = new ToDo('Todo display');
todoDisplay.description = 'When the todo is ready, we make the todo display object. It can display the data in the todo and can input it from the user interface.';
todoDisplay.priority = 'low';

const list = new ToDo('List');
list.description = 'We make a general list object, which is the base for the storage for our objects.';
list.priority = 'medium';

const pandp = new ToDo('Project & Projects');
pandp.description = 'We need two different kind of list. One stores our todos, it\'s the Project. The other stores the different projects, we call it Projects.';
pandp.dueDate = new Date('2020-08-19');
pandp.priority = 'high';
pandp.notes = ['We can make an extended List abstract class, which contains the extra functionality added to the List class with composition. ',
                'Later we can derive the Project and Projects classes from this class by inheritance.'];

const displayList = new ToDo('Display List');
displayList.description = 'The DisplayList object handles the user interface for the Projects and for the active Project.';
displayList.dueDate = new Date('2020-08-19');
displayList.priority = 'high';

const testing = new ToDo('Testing');
testing.description = 'We have to make sure that everything works together seamlessly.';
testing.dueDate = new Date('2020-08-19');
testing.priority = 'high';

const duedates = new ToDo('Duedates');
duedates.description = 'We add the due date to the Project display.';
duedates.dueDate = new Date('2020-08-20');
duedates.priority = 'low';

const colors = new ToDo('Colors');
colors.description = 'We add the colors to the Project display.';
colors.dueDate = new Date('2020-08-21');
colors.priority = 'low';

const styling = new ToDo('Styling');
styling.description = 'We do the CSS styling, to make the site nice.';
styling.dueDate = new Date('2020-08-22');
styling.priority = 'medium';

const lStorage = new ToDo('Local Storage');
lStorage.description = 'We make objects be able to store their data in the browser\'s local storage.';
lStorage.dueDate = new Date('2020-08-23');
lStorage.priority = 'high';

const sampleP = new ToDo('Smaple Project');
sampleP.description = 'We add a sample project.';
sampleP.dueDate = new Date('2020-08-24');
sampleP.priority = 'low';

const bugfixes = new ToDo('Bugfixes');
bugfixes.description = 'We test again the whole thing and fix the remaining bugs.';
bugfixes.dueDate = new Date('2020-08-24');
bugfixes.priority = 'high';
bugfixes.notes = ['We need to make the full surface of the list items clickable. They contain span HTML elements, which are not clickable.',
                '',
                'Other issue is the due date on the display. It doesn\'t get rendered nicely if the title is too long.'];
               
export const todos = [];
todos.push(todoObject);
todos.push(todoDisplay);
todos.push(list);
todos.push(pandp);
todos.push(displayList);
todos.push(testing);
todos.push(duedates);
todos.push(colors);
todos.push(styling);
todos.push(lStorage);
todos.push(sampleP);
todos.push(bugfixes);
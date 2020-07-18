import { ToDo } from './todo.js';
import { List } from './list.js';

const items = [new ToDo('Brush Teeth'),
               new ToDo('Get Dressed'),
               new ToDo('Leave To Work')] 
const project = new List(items);
console.log(project.count);
console.log(project.list[0].title);
console.log(project.list[1].title);
console.log(project.list[2].title);
const newToDo = new ToDo('Do Your Job');
project.add(newToDo, 3);
console.log(project.count);
console.log(project.list[0].title);
console.log(project.list[1].title);
console.log(project.list[2].title);
console.log(project.list[3].title);
project.delete(4);
console.log(project.count);
console.log(project.list[0].title);
console.log(project.list[1].title);
console.log(project.list[2].title);

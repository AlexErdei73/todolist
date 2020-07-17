import { ToDo } from './todo.js'

const todo = new ToDo();
todo.title = 'Brush Teeth'
todo.description = 'Brush your teeth for at least 2minutes long';
const d = new Date(2020, 7, 20);
todo.dueDate = d;
console.log(todo.title);
console.log(todo.description);
console.log(todo.dueDate);
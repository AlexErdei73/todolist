const divTodo = document.querySelector('.todo');
const title = divTodo.querySelector('#title');
const description = divTodo.querySelector('#description');
const dueDate = divTodo.querySelector('#duedate');
const priority = divTodo.querySelector('#priority');
const notes = divTodo.querySelector('#notes');

export function output(todo) {
        if (!todo) return
        title.value = todo.title;
        description.value = todo.description;
        dueDate.value = todo.dueDate.toISOString().slice(0, 10);
        priority.value = todo.priority;
        notes.value = todo.notes.join('\n');
    }

export function input(todo) {
        if (!todo) return
        todo.title = title.value;
        todo.description = description.value;
        if (!dueDate.value) {
            todo.dueDate = new Date(0);
        } else {
            todo.dueDate = new Date(dueDate.value);
        }
        todo.priority = priority.value;
        todo.notes = notes.value.split('\n');
    }

export const divTodos = document.querySelector('.todos');
export const divProjects = document.querySelector('.projects');
const divTodo = document.querySelector('.todo');
const title = divTodo.querySelector('#title');
const description = divTodo.querySelector('#description');
const dueDate = divTodo.querySelector('#duedate');
const priority = divTodo.querySelector('select#priority');
const notes = divTodo.querySelector('#notes');

class TodoDisplay {

    constructor(){
        this.todo = null;
    } 

    output(todo) {
        if (!todo) return
        this.todo = todo;
        title.value = todo.title;
        description.value = todo.description;
        dueDate.value = todo.dueDate.toISOString().slice(0, 10);
        priority.value = todo.priority;
        notes.value = todo.notes.join('\n');
    }

    input(todo) {
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

    get inputTitle() {
        return title;
    }
}

export const divTodos = document.querySelector('.todos');
export const divProjects = document.querySelector('.projects');

export const todoDisplay = new TodoDisplay();
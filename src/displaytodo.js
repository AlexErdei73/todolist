const title = document.querySelector('#title');
const description = document.querySelector('#description');
const dueDate = document.querySelector('#duedate');
const priority = document.querySelector('#priority');
const notes = document.querySelector('#notes');

export function display(todo) {
        title.value = todo.title;
        description.value = todo.description;
        dueDate.value = todo.dueDate.toISOString().slice(0, 10);
        priority.value = todo.priority;
        notes.value = todo.notes.join('\n');
    }


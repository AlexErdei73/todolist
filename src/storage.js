import { ToDo } from './todo.js';

const _saveTodo = new WeakMap();
const _loadTodo = new WeakMap();
const _saveArray = new WeakMap();
const _loadArray = new WeakMap();

class Storage {

    constructor() {
        _saveTodo.set(this, (key, todo) => {
            localStorage.setItem(key + '.0', todo.title);
            localStorage.setItem(key + '.1', todo.description);
            const dateString = todo.dueDate.toISOString().slice(0, 10);
            localStorage.setItem(key + '.2', dateString);
            localStorage.setItem(key + '.3', todo.priority);
            const joinedNotes = todo.notes.join('\n');
            localStorage.setItem(key + '.4', joinedNotes);
        });
        
        _loadTodo.set(this, (key, todo) => {
            todo.title = localStorage.getItem(key + '.0');
            todo.description = localStorage.getItem(key + '.1');
            const dateString = localStorage.getItem(key + '.2');
            todo.dueDate = new Date(dateString);
            todo.priority = localStorage.getItem(key + '.3');
            const joinedNotes = localStorage.getItem(key + '.4');
            todo.notes = joinedNotes.split('\n');
        });
        
        _saveArray.set(this, (key, customarray) => {
            localStorage.setItem(key + '.title', customarray.title);
            localStorage.setItem(key + '.active', customarray.active);
            localStorage.setItem(key + '.length', customarray.length);
            customarray.forEach((item, i) => {
              let newKey = key + '.' + i.toString();
              this.save(newKey, item);
            });
        });

        _loadArray.set(this, (key, customarray) => {
            customarray.erase();
            customarray.title = localStorage.getItem(key + '.title');
            customarray.active = localStorage.getItem(key + '.active');
            const length = localStorage.getItem(key + '.length');
            for (let i = 0; i < length; i++) {
              let newKey = key + '.' + i.toString();
              const item = customarray.createItem();
              this.load(newKey, item);
            }
        });
    }

    save(key, item) {
        if (item instanceof ToDo) _saveTodo.get(this)(key, item) 
            else _saveArray.get(this)(key, item);
    }

    load(key, item) {
        if (item instanceof ToDo) _loadTodo.get(this)(key, item) 
            else _loadArray.get(this)(key, item);
    }
}

export const storage = new Storage();
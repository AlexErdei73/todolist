import { ToDo } from './todo.js';

class Storage {

    saveTodo(key, todo) {
        localStorage.setItem(key + '.0', todo.title);
        localStorage.setItem(key + '.1', todo.description);
        const dateString = todo.dueDate.toISOString().slice(0, 10);
        localStorage.setItem(key + '.2', dateString);
        localStorage.setItem(key + '.3', todo.priority);
        const joinedNotes = todo.notes.join('\n');
        localStorage.setItem(key + '.4', joinedNotes);
    }
    
    loadTodo(key, todo) {
        todo.title = localStorage.getItem(key + '.0');
        todo.description = localStorage.getItem(key + '.1');
        const dateString = localStorage.getItem(key + '.2');
        todo.dueDate = new Date(dateString);
        todo.priority = localStorage.getItem(key + '.3');
        const joinedNotes = localStorage.getItem(key + '.4');
        todo.notes = joinedNotes.split('\n');
    }
    
    saveList(key, list) {
        localStorage.setItem(key + '.title', list.title);
        localStorage.setItem(key + '.active', list.active);
        localStorage.setItem(key + '.length', list.list.count);
        list.list.arr.forEach((item, i) => {
          let newKey = key + '.' + i.toString();
          this.save(newKey, item);
        });
    }
    
    loadList(key, list) {
        list.list.erase();
        list.title = localStorage.getItem(key + '.title');
        list.active = localStorage.getItem(key + '.active');
        const length = localStorage.getItem(key + '.length');
        for (let i = 0; i < length; i++) {
          let newKey = key + '.' + i.toString();
          const item = list.createItem();
          this.load(newKey, item);
        }
    }

    save(key, item) {
        if (item instanceof ToDo) this.saveTodo(key, item) 
            else this.saveList(key, item);
    }

    load(key, item) {
        if (item instanceof ToDo) this.loadTodo(key, item) 
            else this.loadList(key, item);
    }
}

export const storage = new Storage();
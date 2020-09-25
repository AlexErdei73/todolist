import { todoDisplay } from './displaytodo.js';

const _title = new WeakMap();
const _description = new WeakMap();
const _dueDate = new WeakMap();
const _priority = new WeakMap();
const _notes = new WeakMap();

export class ToDo{
    constructor(title = ''){
        this.display = todoDisplay;
        _title.set(this, title);
        _dueDate.set(this, new Date(0));
        _notes.set(this, []);
    }

    set title(t) {
        _title.set(this, t);
    }
    
    get title() {
        return _title.get(this);
    }

    set description(text) {
        _description.set(this, text);
    }
    
    get description() {
        return _description.get(this);
    }

    set dueDate(date) {
        _dueDate.set(this, date);
    }
    
    get dueDate() {
        return _dueDate.get(this);
    }

    set priority(text) {
        _priority.set(this, text);
    }
    
    get priority() {
        return _priority.get(this);
    }

    set notes(arr) {
        _notes.set(this, arr);
    }
    
    get notes() {
        return _notes.get(this);
    }

    input() {
        this.display.input();
    }

    output() {
        this.display.output();
    }

    save(key) {
        localStorage.setItem(key + '.0', this.title);
        localStorage.setItem(key + '.1', this.description);
        const dateString = this.dueDate.toISOString().slice(0, 10);
        localStorage.setItem(key + '.2', dateString);
        localStorage.setItem(key + '.3', this.priority);
        const joinedNotes = this.notes.join('\n');
        localStorage.setItem(key + '.4', joinedNotes);
    }

    load(key) {
        this.title = localStorage.getItem(key + '.0');
        this.description = localStorage.getItem(key + '.1');
        const dateString = localStorage.getItem(key + '.2');
        this.dueDate = new Date(dateString);
        this.priority = localStorage.getItem(key + '.3');
        const joinedNotes = localStorage.getItem(key + '.4');
        this.notes = joinedNotes.split('\n');
    }
}
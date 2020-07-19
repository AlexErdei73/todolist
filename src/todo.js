const _title = new WeakMap();
const _description = new WeakMap();
const _dueDate = new WeakMap();
const _priority = new WeakMap();
const _notes = new WeakMap();

export class ToDo{
    constructor(title = ''){
        _title.set(this, title);
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

    set priority(number) {
        _priority.set(this, number);
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
}
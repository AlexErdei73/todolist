import { List } from './list.js';
import { ToDo } from './todo.js';
import { DisplayList } from './displaylist.js';
import { divTodos, divProjects } from './displaytodo.js';

const _title = new WeakMap();
const _list = new WeakMap();
const _active = new WeakMap();
const _updateDisplay = new WeakMap();
const _outputActiveChild = new WeakMap();
class ListWithActiveItem {
    constructor(title, divDisplay){
        this.display = new DisplayList(divDisplay, this);
        _title.set(this, title);
        _list.set(this, new List());
        _active.set(this, -1);
        _updateDisplay.set(this, (items, inputindex, outputindex) => {
            if (inputindex >= 0 && inputindex < items.count) items.arr[inputindex].input();
            if (outputindex >= 0) items.arr[outputindex].output();
        })
        _outputActiveChild.set(this, () => {
            const items = _list.get(this).arr;
            const active = _active.get(this);
            if (active >= 0) items[active].output();
        })
    }

    set title(text) {
        _title.set(this, text);
    }

    get title() {
        return _title.get(this);
    }

    get list() {
        return _list.get(this);
    }

    get active() {
        return _active.get(this);
    }

    set active(i) {
        const list = _list.get(this);
        const active = _active.get(this);
        _active.set(this, i);
        _updateDisplay.get(this)(list, active, i);
        this.output();
        return _active.get(this);
    }

    addNew(item) {
        const list = _list.get(this);
        item.input();
        list.add(item);
        _active.set(this, list.count - 1);
        _list.set(this, list);
        this.output();
    }

    remove() {
        const list = _list.get(this);
        if (list.count > 0) {
            list.delete(this.active);
            if (list.count <= this.active) {
                _active.set(this, list.count - 1);
            }
        }
        _list.set(this, list);
        this.output();
    }

    input() {
        this.display.input();
    }

    output() {
        this.display.output();
        _outputActiveChild.get(this)();
    }
}

const _isActive = new WeakMap();
class Project extends ListWithActiveItem {
    constructor(title, projects) {
        super(title, divTodos);
        this.projects = projects;
        _isActive.set(this, () => {
            const active = this.projects.active;
            return (this.projects.list.arr[active] === this);
        })
    }

    get dueDate() {
        return new Date(0);
    }

    new() {
        if (!_isActive.get(this)()) return
        const todo = new ToDo();
        this.addNew(todo);  
    }

    remove() {
        if (_isActive.get(this)()) super.remove();
    }


    output() {
        if (_isActive.get(this)()) super.output();
    }
}

export class Projects extends ListWithActiveItem {
    constructor(title){
        super(title, divProjects);
    }

    new() {
        const project = new Project('', this);
        super.addNew(project);
    }
}
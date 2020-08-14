import { List } from './list.js';
import { ToDo } from './todo.js';
import { display, save } from './displaytodo.js';

const _title = new WeakMap();
const _list = new WeakMap();
const _active = new WeakMap();
export class Project {
    constructor(title){
        _title.set(this, title);
        _list.set(this, new List());
        _active.set(this, -1);
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
        if (active > -1) save(list.arr[active]);
        display(list.arr[i]);
        return _active.set(this, i);
    }

    new() {
        const list = _list.get(this);
        list.add(new ToDo(''));
        this.active = list.count - 1;
        _list.set(this, list);
    }

    remove() {
        const list = _list.get(this);
        if (list.count > 0) {
            list.delete(this.active);
            if (list.count <= this.active) {
                this.active = list.count - 1;
            }
        }
        _list.set(this, list);
    }
}

const _projectList = new WeakMap();
export class Projects {
    constructor() {
        _projectList.set(this, new List());
    }

    get projectList() {
        return _projectList.get(this);
    }

    add(project) {
        _projectList.get(this).add(project);
    }

    remove(project) {
        _projectList.get(this).del(project);
    }
}
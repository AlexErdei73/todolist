import { List } from './list.js';

const _title = new WeakMap();
const _list = new WeakMap();
export class Project {
    constructor(title){
        _title.set(this, title);
        _list.set(this, new List());
    }

    get title() {
        return _title.get(this);
    }

    get list() {
        return _list.get(this);
    }

    add(todo) {
        const list = _list.get(this);
        list.add(todo);
        _list.set(this, list);
    }

    delete(todo) {
        const list = _list.get(this);
        list.del(todo);
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
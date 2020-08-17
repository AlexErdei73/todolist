import { List } from './list.js';
import { ToDo } from './todo.js';
import { DisplayList } from './displaylist.js';
import { divTodos, divProjects } from './displaytodo.js';

const _title = new WeakMap();
const _list = new WeakMap();
const _active = new WeakMap();
class ListWithActiveItem {
    constructor(title){
        _title.set(this, title);
        _list.set(this, new List());
        _active.set(this, -1);
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
        if (active >= 0 && active < list.count) list.arr[active].input();
        if (i >= 0) list.arr[i].output();
        return _active.set(this, i);
    }

    addNew(item) {
        const list = _list.get(this);
        item.input();
        list.add(item);
        _active.set(this, list.count - 1);
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

const _isActive = new WeakMap();
class Project extends ListWithActiveItem {
    constructor(title, projects) {
        super(title);
        this.display = new DisplayList(divTodos, this);
        this.projects = projects;
        _isActive.set(this, () => {
            const active = this.projects.active;
            return (this.projects.list.arr[active] === this);
        })
    }

    new() {
        if (!_isActive.get(this)()) return
        const todo = new ToDo();
        this.addNew(todo);
    }

    remove() {
        if (!_isActive.get(this)()) return
        super.remove();
    }

    input() {
        this.display.input();
    }

    output() {
        this.display.output();
    }
}

export class Projects extends ListWithActiveItem {
    constructor(){
        super('allProjects');
        this.display = new DisplayList(divProjects, this);
    }
    new() {
        const project = new Project('', this);
        this.addNew(project);
        project.display.output();
    }
}
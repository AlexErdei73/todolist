import { List } from './list.js';
import { ToDo } from './todo.js';

const _title = new WeakMap();
const _list = new WeakMap();
const _active = new WeakMap();
class ListWithActiveItem {
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
        if (active >= 0 && active < list.count) list.arr[active].input();
        if (i >= 0) list.arr[i].output();
        return _active.set(this, i);
    }

    addNew(item) {
        const list = _list.get(this);
        item.input();
        list.add(item);
        _active.set(this,list.count - 1);
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

export class Project extends ListWithActiveItem {
    new() {
        const item = new ToDo();
        this.addNew(item);
    }
}
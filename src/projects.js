import { List } from './list.js';
import { ToDo } from './todo.js';
import { displayTodos, displayProjects } from './displaylist.js';

const _title = new WeakMap();
const _list = new WeakMap();
const _active = new WeakMap();

class ListWithActiveItem {
  constructor(title, display) {
    this.display = display;
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
    _active.set(this, i);
  }

  addNew(item) {
    const list = _list.get(this);
    list.add(item);
    _active.set(this, list.count - 1);
    _list.set(this, list);
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
  }

  save(key) {
    localStorage.setItem(key + '.title', this.title);
    localStorage.setItem(key + '.active', this.active);
    localStorage.setItem(key + '.length', this.list.count);
    this.list.arr.forEach((item, i) => {
      let newKey = key + '.' + i.toString();
      item.save(newKey);
    });
  }

  load(key) {
    this.list.erase();
    this.title = localStorage.getItem(key + '.title');
    _active.set(this, localStorage.getItem(key + '.active'));
    const length = localStorage.getItem(key + '.length');
    for (let i = 0; i < length; i++) {
      let newKey = key + '.' + i.toString();
      const item = this.createItem();
      item.load(newKey);
    }
  }
}

const _isActive = new WeakMap();
class Project extends ListWithActiveItem {
  constructor(title, projects) {
    super(title, displayTodos);
    this.projects = projects;
    _isActive.set(this, () => {
      const active = this.projects.active;
      return this.projects.list.arr[active] === this;
    });
  }

  get dueDate() {
    return new Date(0);
  }

  new() {
    if (!_isActive.get(this)()) return;
    this.createItem();
  }

  createItem() {
    const todo = new ToDo();
    todo.description = '';
    this.addNew(todo);
    return todo;
  }

  remove() {
    if (_isActive.get(this)()) super.remove();
  }
}

export class Projects extends ListWithActiveItem {
  constructor(title) {
    super(title, displayProjects);
  }

  new() {
    this.createItem();
  }

  createItem() {
    const project = new Project('', this);
    super.addNew(project);
    return project;
  }
}
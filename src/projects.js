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
  constructor(title, divDisplay) {
    this.display = new DisplayList(divDisplay, this);
    _title.set(this, title);
    _list.set(this, new List());
    _active.set(this, -1);
    _updateDisplay.set(this, (items, inputindex, outputindex) => {
      if (inputindex >= 0 && inputindex < items.count)
        items.arr[inputindex].input();
      if (outputindex >= 0) items.arr[outputindex].output();
    });
    _outputActiveChild.set(this, () => {
      const items = _list.get(this).arr;
      const active = _active.get(this);
      if (active >= 0) items[active].output();
    });
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
    _outputActiveChild.get(this)();
    this.display.update();
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
    this.output();
  }

  input() {
    this.display.input();
  }

  output() {
    this.display.output();
    _outputActiveChild.get(this)();
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
    super(title, divTodos);
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
    this.output();
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

  output() {
    if (_isActive.get(this)()) super.output();
  }
}

export class Projects extends ListWithActiveItem {
  constructor(title) {
    super(title, divProjects);
  }

  new() {
    this.createItem();
    this.output();
  }

  createItem() {
    const project = new Project('', this);
    super.addNew(project);
    return project;
  }
}
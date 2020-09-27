import { ToDo } from './todo.js';
import { displayTodos, displayProjects } from './displaylist.js';

const _title = new WeakMap();
const _display = new WeakMap();
const _active = new WeakMap();

class ArrayWithActiveItem extends Array{
  constructor(title, display) {
    super();
    _display.set(this, display);
    _title.set(this, title);
    _active.set(this, -1);
  }

  set title(text) {
    _title.set(this, text);
  }

  get title() {
    return _title.get(this);
  }

  get display() {
    return _display.get(this);
  }


  get active() {
    return _active.get(this);
  }

  set active(i) {
    _active.set(this, i);
  }

  addNew(item) {
    this.push(item);
    _active.set(this, this.length - 1);
  }

  remove() {
    if (this.length > 0) {
      this.splice(this.active, 1);
      if (this.length <= this.active) {
        _active.set(this, this.length - 1);
      }
    }
  }

  erase() {
    this.splice(0, this.length);
  }
}

class Project extends ArrayWithActiveItem {
  constructor(title) {
    super(title, displayTodos);
  }

  get dueDate() {
    return new Date(0);
  }

  new() {
    this.createItem();
  }

  createItem() {
    const todo = new ToDo();
    this.addNew(todo);
    return todo;
  }
}

export class Projects extends ArrayWithActiveItem {
  constructor(title) {
    super(title, displayProjects);
  }

  new() {
    this.createItem();
  }

  createItem() {
    const project = new Project('');
    super.addNew(project);
    return project;
  }
}
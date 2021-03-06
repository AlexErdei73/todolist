import { divProjects, divTodos } from './displaytodo.js';
import { allProjects } from './index.js';
import { storage } from './storage.js';

const _title = new WeakMap();
const _ul = new WeakMap();
const _newBtn = new WeakMap();
const _deleteBtn = new WeakMap();
const _addContentToLi = new WeakMap();
const _displayItem = new WeakMap();
const _onClickDelete = new WeakMap();
const _onClickNew = new WeakMap();
const _erase = new WeakMap();
const _onMouseClick = new WeakMap();
const _changeSelection = new WeakMap();
const _setPriority = new WeakMap();
const _updateChildDisplay = new WeakMap();
const _outputActiveChild = new WeakMap();
const _update = new WeakMap();
const _div = new WeakMap();
const _item = new WeakMap();

class DisplayList {
    constructor(div) {
        _div.set(this, div);
        _item.set(this, []);
        _title.set(this, div.querySelector('#title'));
        _ul.set(this, div.querySelector('ul'));
        _newBtn.set(this, div.querySelector('#new'));
        _deleteBtn.set(this, div.querySelector('#delete'));

        _onMouseClick.set(this, (e) => {
            const li = e.target;
            const index = Number(li.dataset.index);
            const active = this.item.active;
            _updateChildDisplay.get(this)(active, index);
            this.item.active = index;
            _update.get(this)();
        })

        _addContentToLi.set(this, (li, text, date) => {
            li.innerHTML = '';
            let dateText = '';
            if (date.valueOf() != 0) {
                dateText = date.toISOString().slice(0, 10);
            } 
            const spanDate = document.createElement('span');
            spanDate.id = 'duedate';
            spanDate.textContent = dateText;
            const spanTitle = document.createElement('span');
            spanTitle.textContent = text;
            li.appendChild(spanTitle);
            li.appendChild(spanDate);
        })

        _changeSelection.set(this, (item, i, active) => {
            if (active == i) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        })

        _setPriority.set(this, (li, priority) => {
            li.classList.remove('low');
            li.classList.remove('medium');
            li.classList.remove('high');
            if (priority) li.classList.add(priority)
                else li.classList.add('low');
        })

        _displayItem.set(this, (item, i, active) => {
            const li = document.createElement('li');
            _addContentToLi.get(this)(li, item.title, item.dueDate);
            li.dataset.index = i.toString();
            _setPriority.get(this)(li, item.priority);
            li.addEventListener('click', _onMouseClick.get(this));
            _changeSelection.get(this)(li, i, active);
            const ul = _ul.get(this);
            ul.appendChild(li);
        })

        _onClickDelete.set(this, () => {
            this.item.remove();
            this.output(this.item);
        })

        _deleteBtn.get(this).addEventListener('click', _onClickDelete.get(this));

        _onClickNew.set(this, () => {
            const index = this.item.active;
            this.item.new();
            const active = this.item.length - 1;
            this.item.active = active;
            _updateChildDisplay.get(this)(index, active);
            const activeItem = this.item[active];
            activeItem.display.inputTitle.value = '';
            _outputActiveChild.get(this);
            this.output(this.item);
        })

        _newBtn.get(this).addEventListener('click', _onClickNew.get(this));

        _erase.set(this, () => {
            const ul = _ul.get(this);
            ul.innerHTML = '';
            _ul.set(this, ul);
        })

        _updateChildDisplay.set(this, (inputindex, outputindex) => {
            if (inputindex >= 0) {
                const inputItem = this.item[inputindex];
                inputItem.display.input(inputItem);
            }
            if (outputindex >= 0) {
                const outputItem = this.item[outputindex];
                outputItem.display.output(outputItem);
            }
          })

        _outputActiveChild.set(this, () => {
            const active = this.item.active;
            if (active >= 0) { 
                const activeItem = this.item[active];
                activeItem.display.output(activeItem);
            }
          })

        _update.set(this, () => {
            _outputActiveChild.get(this)();
            const listItems = _div.get(this).querySelectorAll('li');
            const active = this.item.active;
            let item = null;
            listItems.forEach((li, i) => {
                item = this.item[i];
                _addContentToLi.get(this)(li, item.title, item.dueDate);
                _setPriority.get(this)(li, item.priority);
                _changeSelection.get(this)(li, i, active);
            })
            this.save();
        })
    }

    save() {
        if (allProjects.length > 0) storage.save('', allProjects);
    }

    output(item) {
        _erase.get(this)();
        _item.set(this, item);
        if (item.display.inputTitle && item.title) 
            item.display.inputTitle.value = item.title;
        const active = item.active;
        item.forEach((element, i) => {
            _displayItem.get(this)(element, i, active);
        });
        _outputActiveChild.get(this)();
        this.save();
    }

    input(item) {
        item.title = item.display.inputTitle.value;
    }

    get item() {
        return _item.get(this);
    }

    get inputTitle() {
        return _title.get(this);
    }
}

export const displayTodos = new DisplayList(divTodos);
export const displayProjects = new DisplayList(divProjects);
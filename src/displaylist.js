import { allProjects } from './index.js'

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

export class DisplayList {
    constructor(div, items) {
        this.div = div;
        this.items = items;
        _title.set(this, div.querySelector('#title'));
        _ul.set(this, div.querySelector('ul'));
        _newBtn.set(this, div.querySelector('#new'));
        _deleteBtn.set(this, div.querySelector('#delete'));

        _onMouseClick.set(this, (e) => {
            const li = e.target;
            this.items.active = Number(li.dataset.index);
        })

        _addContentToLi.set(this, (li, text, date) => {
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

        _displayItem.set(this, (item, i, active) => {
            const li = document.createElement('li');
            _addContentToLi.get(this)(li, item.title, item.dueDate);
            li.dataset.index = i.toString();
            li.id = 'low';
            if (item.priority) li.id = item.priority;
            li.addEventListener('click', _onMouseClick.get(this));
            _changeSelection.get(this)(li, i, active);
            const ul = _ul.get(this);
            ul.appendChild(li);
        });

        _onClickDelete.set(this, () => {
            this.items.remove();
        });

        _deleteBtn.get(this).addEventListener('click', _onClickDelete.get(this));

        _onClickNew.set(this, () => {
            this.items.new();
        });

        _newBtn.get(this).addEventListener('click', _onClickNew.get(this));

        _erase.set(this, () => {
            const ul = _ul.get(this);
            ul.innerHTML = '';
            _ul.set(this, ul);
        });
    }

    changeSelection() {
        const listItems = this.div.querySelectorAll('li');
        const active = this.items.active;
        listItems.forEach((li, i) => {
            _changeSelection.get(this)(li, i, active);
        })
    }

    save() {
        if (allProjects.list.count > 0) allProjects.save('');
    }

    output() {
        _erase.get(this)();
        if (_title.get(this)) _title.get(this).value = this.items.title;
        const active = this.items.active;
        this.items.list.arr.forEach((element, i) => {
            _displayItem.get(this)(element, i, active);
        });
        this.save();
    }

    input() {
        this.items.title = _title.get(this).value;
    }
}
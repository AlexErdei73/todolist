const _title = new WeakMap();
const _ul = new WeakMap();
const _newBtn = new WeakMap();
const _deleteBtn = new WeakMap();
const _displayItem = new WeakMap();
const _onClickDelete = new WeakMap();
const _onClickNew = new WeakMap();
const _erase = new WeakMap();

export class DisplayList {
    constructor(div, items) {
        this.div = div;
        this.items = items;
        _title.set(this, div.querySelector('#title'));
        _ul.set(this, div.querySelector('ul'));
        _newBtn.set(this, div.querySelector('#new'));
        _deleteBtn.set(this, div.querySelector('#delete'));
        _displayItem.set(this, (item) => {
            const li = document.createElement('li');
            li.textContent = item.title;
            const ul = _ul.get(this);
            ul.appendChild(li);
        });
        _onClickDelete.set(this, () => {
            this.items.remove();
            this.output();
        });
        _deleteBtn.get(this).addEventListener('click', _onClickDelete.get(this));
        _onClickNew.set(this, () => {
            this.items.new();
            this.output();
        });
        _newBtn.get(this).addEventListener('click', _onClickNew.get(this));
        _erase.set(this, () => {
            const ul = _ul.get(this);
            ul.innerHTML = '';
            _ul.set(this, ul);
        });
    }

    output() {
        _erase.get(this)();
        _title.set(this, this.items.title);
        this.items.list.arr.forEach(element => {
            _displayItem.get(this)(element);
        });
    }

    input() {
        this.items.title = _title.get(this).value;
    }
}
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
            this.render();
        });
        _deleteBtn.get(this).addEventListener('click', _onClickDelete.get(this));
        _onClickNew.set(this, () => {
            this.items.new();
            this.render();
        });
        _newBtn.get(this).addEventListener('click', _onClickNew.get(this));
        _erase.set(this, () => {
            const ul = _ul.get(this);
            ul.innerHTML = '';
            _ul.set(this, ul);
        });
    }

    render() {
        _erase.get(this)();
        this.items.list.arr.forEach(element => {
            _displayItem.get(this)(element);
        });
    }
}
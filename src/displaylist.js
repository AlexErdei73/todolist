const _title = new WeakMap();
const _ul = new WeakMap();
const _newBtn = new WeakMap();
const _deleteBtn = new WeakMap();
const _displayItem = new WeakMap();
const _onClickDelete = new WeakMap();
const _onClickNew = new WeakMap();
const _erase = new WeakMap();
const _onMouseClick = new WeakMap();

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
            this.items.active = Number(li.id);
        })
        _displayItem.set(this, (item, i, active) => {
            const li = document.createElement('li');
            li.textContent = item.title;
            li.id = i;
            li.addEventListener('click', _onMouseClick.get(this));
            if (active == i) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            };
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

    output() {
        _erase.get(this)();
        if (_title.get(this)) _title.get(this).value = this.items.title;
        const active = this.items.active;
        this.items.list.arr.forEach((element, i) => {
            _displayItem.get(this)(element, i, active);
        });
    }

    input() {
        this.items.title = _title.get(this).value;
    }
}
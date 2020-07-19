const _list = new WeakMap();

export class List {
    constructor(items = []){
        _list.set(this, items);
    }

    add(item, index = -1){
        const list = _list.get(this);
        const count = list.length;
        if (index == -1){
            list.push(item);
        } else {
            if (index < 0 || index > count) 
                throw new Error('index is out of range')
            list.splice(index, 0, item);
        }
        _list.set(this, list);
    }

    delete(index = -1){
        let list = _list.get(this);
        if (index != -1) {
            if (index < 0 || index >= list.length)
                throw new Error('index out of range')
            list.splice(index, 1);
        } else {
            list.pop();
        }
        _list.set(this, list);
    }

    del(item){
        const list = _list.get(this);
        if (item) {
            const index = list.indexOf(item);
            if (index == -1) 
                throw new Error('item is not in the list')
            this.delete(index);
        }
    }

    get list() {
        return _list.get(this);
    }

    get count() {
        return _list.get(this).length;
    }
}
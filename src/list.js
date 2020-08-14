const _array = new WeakMap();

export class List {
    constructor(items = []){
        _array.set(this, items);
    }

    add(item, index = -1){
        const arr = _array.get(this);
        const count = arr.length;
        if (index == -1){
            arr.push(item);
        } else {
            if (index < 0 || index > count) 
                throw new Error('index is out of range')
            arr.splice(index, 0, item);
        }
        _array.set(this, arr);
    }

    delete(index = -1){
        let arr = _array.get(this);
        if (index != -1) {
            if (index < 0 || index >= arr.length)
                throw new Error('index out of range')
            arr.splice(index, 1);
        } else {
            arr.pop();
        }
        _array.set(this, arr);
    }

    del(item){
        const arr = _array.get(this);
        if (item) {
            const index = arr.indexOf(item);
            if (index == -1) 
                throw new Error('item is not in the list')
            this.delete(index);
        }
    }

    get arr() {
        return _array.get(this);
    }

    get count() {
        return _array.get(this).length;
    }
}
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
            const elem = list[count - 1];
            list.push(elem);
            for (let i = count; i > index; i--){
                list[i] = list[i - 1];
            }
            list[index] = item;
        }
        _list.set(this, list);
    }

    delete(index = -1){
        let list = _list.get(this);
        if (index != -1) {
            if (index < 0 || index >= list.length)
                throw new Error('index out of range')
            for (let i = index; i < list.length - 1; i++){
                list[i] = list[i + 1];
            }
        }
        list.pop();
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
const keys = Symbol('keys');

class WeakMapIndex extends WeakMap {
    constructor() {
        super();
        this[keys] = [];
    }

    set(key, value) {
        if (!this.has(key)) {
            this[keys].push(key);
        }

        return super.set(key, value);
    }

    delete(key) {
        if (this.has(key)) {
            let index = this[keys].indexOf(key);
            if (index > -1) {
                this[keys].splice(index, 1);
            }

            return super.delete(key);
        }
    }

    get keys() {
        return [...this[keys]];
    }
}

export {WeakMapIndex};
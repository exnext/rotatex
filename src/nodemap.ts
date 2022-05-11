export class NodeMap<T> extends WeakMap {
    private keys: Node[] = [];

    get nodes(): Node[] {
        return [...this.keys];
    }

    constructor() {
        super();
    }

    set(key: Node, value: T): this {
        if (!this.has(key)) {
            this.keys.push(key);
        }

        return super.set(key, value);
    }

    get(key: Node): T {
        return super.get(key);
    }

    delete(key: Node): boolean {
        let result: boolean = super.delete(key);

        if (result) {
            let index: number = this.keys.indexOf(key);
            if (index > -1) {
                this.keys.splice(index, 1);
            }
        }

        return result;
    }
}

export class DemoMap extends WeakMap {
    constructor() {
        super();
    }
}
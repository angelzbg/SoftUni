class List {
    constructor() {
        this.list = [];
        this.size = 0;
    }

    add(element) {
        this.list.push(element);
        this.size += 1;
        return this.list.sort((a, b) => a - b);
    }

    remove(index) {
        if (this.list[index] !== undefined) {
            this.list.splice(index, 1);
            this.size--;
        } else {
            throw new Error();
        }
        return this.list.sort((a, b) => a - b);
    }

    get(index) {
        if (this.list[index] !== undefined) {
            return this.list[index];
        } else {
            throw new Error();
        }
    }
}

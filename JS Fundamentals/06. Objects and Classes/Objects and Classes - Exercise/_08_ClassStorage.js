class Storage {

    constructor(capacity) {
        this.capacity = capacity;
        this.storage = [];
        this.totalCost = 0;
    }

    addProduct(product) {
        this.storage.push(product);
        this.capacity -= product.quantity;
        this.totalCost += product.price * product.quantity;
    }

    getProducts() {
        let products = '';
        this.storage.forEach(p => products += `${JSON.stringify(p)}\n`);
        return products.trim();
    }
}
storage = (input = []) => {
    let storage = new Map();
    input.forEach((el) => {
        let [product, quantity] = el.split(' ');
        if (!storage.has(product)) {
            storage.set(product, Number(quantity));
        } else {
            storage.set(product, storage.get(product) + Number(quantity));
        }
    });

    for (let [key, value] of storage) {
        console.log(`${key} -> ${value}`);
    }
};

orders = (product = '', quantity = 1) => {
    let products = {
        coffee: 1.5,
        water: 1.0,
        coke: 1.4,
        snacks: 2.0,
    };

    console.log((products[product] * quantity).toFixed(2));
};

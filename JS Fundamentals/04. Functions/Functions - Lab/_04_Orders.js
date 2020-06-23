orders = (product = '', quantity = 1) => {
    let products = {
        coffee: 1.50,
        water: 1.00,
        coke: 1.40,
        snacks: 2.00
    };
    
    console.log((products[product] * quantity).toFixed(2));
};
lowestPrices = (input = []) => {
    let prices = {};
    input.forEach((line) => {
        let [town, product, price] = line.split(' | ');
        if (!prices[product]) {
            prices[product] = {};
        }

        prices[product][town] = Number(price);
    });

    Object.entries(prices).forEach(([product, towns]) => {
        let [town, price] = Object.entries(towns).sort((a, b) => a[1] - b[1])[0];
        console.log(`${product} -> ${price} (${town})`);
    });
};

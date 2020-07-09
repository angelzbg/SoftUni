cityMarkets = (input = []) =>
    Object.entries(
        input.reduce((towns, info) => {
            const [town, product, amount, price] = info.split(/ -> | : /g);
            if (!towns[town]) {
                towns[town] = {};
            }

            towns[town][product] = amount * price;
            return towns;
        }, {}),
    )
        .map(([town, products]) => {
            return (
                `Town - ${town}\n` +
                Object.entries(products)
                    .map(([product, income]) => `$$$${product} : ${income}`)
                    .join('\n')
            );
        })
        .join('\n');

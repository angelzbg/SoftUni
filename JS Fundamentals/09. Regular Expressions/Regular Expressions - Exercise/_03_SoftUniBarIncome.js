barIncome = (input = []) => {
    let total = 0;
    let pattern = /%(?<name>[A-Z][a-z]+)%(?:.+)?\<(?<product>\w+)\>(?:.+)?\|(?<count>\d+)\|(?:[^0-9]+)?(?<price>\d+(\.\d+)?)\$/;

    while ((line = input.shift()) !== 'end of shift') {
        let result = line.match(pattern);

        if (result) {
            let g = result.groups;
            let price = Number(g.count) * Number(g.price);
            total += price;

            console.log(`${g.name}: ${g.product} - ${price.toFixed(2)}`);
        }
    }

    console.log(`Total income: ${total.toFixed(2)}`);
};

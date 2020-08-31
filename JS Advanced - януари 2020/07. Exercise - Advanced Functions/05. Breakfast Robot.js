breakfastRobot = () => {
    const recipes = {
        apple: {
            carbohydrate: 1,
            flavour: 2,
        },
        lemonade: {
            carbohydrate: 10,
            flavour: 20,
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3,
        },
        eggs: {
            protein: 5,
            fat: 1,
            flavour: 1,
        },
        turkey: {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10,
        },
    };

    const stock = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0,
    };

    const actions = {
        restock: (ingr = '', count = 0) => [(stock[ingr] += count), 'Success'].pop(),
        prepare: (product = '', count = 0) => {
            const recipe = Object.entries(recipes[product]);
            for (let [item, countNeeded] of recipe) {
                if (stock[item] < countNeeded * count) {
                    return `Error: not enough ${item} in stock`;
                }
            }

            recipe.forEach(([item, countNeeded]) => {
                stock[item] -= countNeeded * count;
            });

            return 'Success';
        },
        report: () =>
            Object.entries(stock)
                .map(([ingr, count]) => `${ingr}=${count}`)
                .join(' '),
    };

    return (command = '') => {
        const [cmd, item, count] = command.split(' ');
        return actions[cmd](item, +count);
    };
};

const manager = breakfastRobot();
[
    'restock protein 100',
    'restock carbohydrate 100',
    'restock fat 100',
    'restock flavour 100',
    'report',
    'prepare lemonade 2',
    'report',
    'prepare lemonade 1',
    'report',
].forEach((cmd) => console.log(manager(cmd)));

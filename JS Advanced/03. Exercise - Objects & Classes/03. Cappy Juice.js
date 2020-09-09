cappyJuice = (data = []) => {
    return Object.entries(
        data.reduce(
            (factory, juiceStr) => {
                let [name, value] = juiceStr.split(' => ');
                factory.storage[name] = Number(value) + (factory.storage[name] || 0);
                let currentBottles = Math.floor(factory.storage[name] / 1000);
                if (currentBottles) {
                    factory.bottles[name] = currentBottles;
                }
                return factory;
            },
            { storage: {}, bottles: {} },
        ).bottles,
    )
        .map(([name, bottles]) => `${name} => ${bottles}`)
        .join('\n');
};

taskThree = (input = []) => {
    const plants = input.splice(0, +input.shift()).reduce((plants, line) => {
        let [name, rarity] = line.split('<->');
        plants[name] = { rarity: +rarity, ratings: [] };
        return plants;
    }, {});

    const validate = (plant = '') => {
        if (!plants[plant]) {
            console.log('error');
            return false;
        }

        return true;
    };

    while ((line = input.shift()) !== 'Exhibition') {
        if (line.startsWith('Rate')) {
            let [plant, rating] = line.substring(6).split(' - ');
            if (validate(plant)) {
                plants[plant].ratings.push(+rating);
            }
        } else if (line.startsWith('Update')) {
            let [plant, newRarity] = line.substring(8).split(' - ');
            if (validate(plant)) {
                plants[plant].rarity = +newRarity;
            }
        } else {
            // 'Reset'
            let plant = line.substring(7);
            if (validate(plant)) {
                plants[plant].ratings = [];
            }
        }
    }

    Object.keys(plants).forEach((plant) => {
        plants[plant].ratings =
            plants[plant].ratings.reduce((sum, el) => sum + el, 0) / (plants[plant].ratings.length || 1);
    });

    const output = Object.entries(plants)
        .sort((a, b) => b[1].rarity - a[1].rarity || b[1].ratings - a[1].ratings)
        .map(([name, value]) => `- ${name}; Rarity: ${value.rarity}; Rating: ${value.ratings.toFixed(2)}`)
        .join('\n');
    
    console.log(`Plants for the exhibition:${output ? `\n${output}` : ''}`);
};

taskThree([
    '3',
    'Arnoldii<->4',
    'Woodii<->7',
    'Welwitschia<->2',
    'Rate: Woodii - 10',
    'Rate: Welwitschia - 7',
    'Rate: Arnoldii - 3',
    'Rate: Woodii - 5',
    'Update: Woodii - 5',
    'Reset: Arnoldii',
    'Exhibition',
]);

townsToJSON = (towns = []) => {
    let props = towns.shift();
    props = props.substring(2, props.length - 2).split(' | ');
    towns = towns.map((line) => {
        let town = {};
        let values = line.substring(2, line.length - 2).split(' | ');
        for (let i = 0; i < props.length; i++) {
            town[props[i]] = isNaN(values[i]) ? values[i] : Number(Number(values[i]).toFixed(2));
        }

        return town;
    });

    return JSON.stringify(towns);
};

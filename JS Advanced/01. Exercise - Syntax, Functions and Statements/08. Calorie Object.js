calorieObject = (elements = []) => {
    return elements.reduce(
        (acc, property, idx, arr) => ({
            ...acc,
            [property]: Number(arr.splice(idx + 1, 1)),
        }),
        {},
    );

    let calories = {};
    while (elements.length) {
        calories[elements.shift()] = Number(elements.shift());
    }

    return calories;
};

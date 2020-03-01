(input) => {
    let size = input.shift(),
        color = input.shift(),
        quantity = Number(input.shift());

    let table = {
        'Large': {
            'Red': 16,
            'Green': 12,
            'Yellow': 9
        },
        'Medium': {
            'Red': 13,
            'Green': 9,
            'Yellow': 7
        },
        'Small': {
            'Red': 9,
            'Green': 8,
            'Yellow': 5
        }
    };

    let price = table[size][color]*quantity;
    price *= 0.65; // 35% expenses

    console.log(`${price.toFixed(2)} leva.`);
}
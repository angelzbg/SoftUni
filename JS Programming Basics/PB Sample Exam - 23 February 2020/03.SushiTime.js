(input) => {
    let type = input.shift(),
        restaurant = input.shift(),
        count = Number(input.shift()),
        order = input.shift() === 'Y';
    let table = {
        'Sushi Zone': {
            'sashimi': 4.99,
            'maki': 5.29,
            'uramaki': 5.99,
            'temaki': 4.29
        },
        'Sushi Time': {
            'sashimi': 5.49,
            'maki': 4.69,
            'uramaki': 4.49,
            'temaki': 5.19
        },
        'Sushi Bar': {
            'sashimi': 5.25,
            'maki': 5.55,
            'uramaki': 6.25,
            'temaki': 4.75
        },
        'Asian Pub': {
            'sashimi': 4.50,
            'maki': 4.80,
            'uramaki': 5.50,
            'temaki': 5.50
        }
    };
    if(table[restaurant] === undefined) return console.log(`${restaurant} is invalid restaurant!`);
    let price = table[restaurant][type]*count*(order ? 1.2 : 1);
    console.log(`Total price: ${Math.ceil(price)} lv.`);
}
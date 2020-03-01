(input) => {
    let table = {
        'standard cabin': {
            'Mediterranean': 27.5,
            'Adriatic': 22.99,
            'Aegean': 23
        },
        'cabin with balcony': {
            'Mediterranean': 30.2,
            'Adriatic': 25,
            'Aegean': 26.6
        },
        'apartment': {
            'Mediterranean': 40.5,
            'Adriatic': 34.99,
            'Aegean': 39.8
        }
    };
    let typeCruise = input.shift(),
        typeRoom = input.shift(),
        nights = Number(input.shift());
    let price = table[typeRoom][typeCruise]*nights*4*(nights > 7 ? 0.75 : 1);
    console.log(`Annie's holiday in the ${typeCruise} sea costs ${price.toFixed(2)} lv.`);
}
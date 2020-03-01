(input) => {
    let destination = input.shift(),
        days = input.shift(),
        nights = Number(input.shift());
    
    let table = {
        'France': {
            '21-23': 30,
            '24-27': 35,
            '28-31': 40
        },
        'Italy': {
            '21-23': 28,
            '24-27': 32,
            '28-31': 39
        },
        'Germany': {
            '21-23': 32,
            '24-27': 37,
            '28-31': 43
        }
    };

    console.log(`Easter trip to ${destination} : ${(table[destination][days]*nights).toFixed(2)} leva.`);
}
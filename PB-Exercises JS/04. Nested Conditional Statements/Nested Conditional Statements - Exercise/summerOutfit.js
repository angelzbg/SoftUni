(input) => {
    const deg = Number(input.shift());
    const time = input.shift();
    const table = {
        'Morning': [
            { o: 'Sweatshirt', s: 'Sneakers' },
            { o: 'Shirt', s: 'Moccasins' },
            { o: 'T-Shirt', s: 'Sandals' }
        ],
        'Afternoon': [
            { o: 'Shirt', s: 'Moccasins' },
            { o: 'T-Shirt', s: 'Sandals' },
            { o: 'Swim Suit', s: 'Barefoot' }
        ],
        'Evening': [
            { o: 'Shirt', s: 'Moccasins' },
            { o: 'Shirt', s: 'Moccasins' },
            { o: 'Shirt', s: 'Moccasins' }
        ]
    };
    let pick = {};
    if(deg >= 10 && deg <= 18) pick = table[time][0];
    else if(deg > 18 && deg <= 24) pick = table[time][1];
    else if(deg >= 25) pick = table[time][2];
    console.log(`It's ${deg} degrees, get your ${pick.o} and ${pick.s}.`);
}
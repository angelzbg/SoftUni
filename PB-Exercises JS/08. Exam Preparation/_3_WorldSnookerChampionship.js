(input) => {
    const   stage = input.shift(),
            ticketType = input.shift(),
            ticketCount = +input.shift(),
            picture = input.shift() === 'Y',
            table = {
                'Quarter final': {
                    'Standard': 55.5,
                    'Premium': 105.2,
                    'VIP': 118.9
                },
                'Semi final': {
                    'Standard': 75.88,
                    'Premium': 125.22,
                    'VIP': 300.4
                },
                'Final': {
                    'Standard': 110.10,
                    'Premium': 160.66,
                    'VIP': 400
                }
            };
    
    let price = table[stage][ticketType] * ticketCount;

    if(price > 4000) {
        price*=0.75;
    } else if(price > 2500) {
        price*=0.9;
        if(picture) price+=40*ticketCount;
    } else {
        if(picture) price+=40*ticketCount;
    }

    console.log(price.toFixed(2));
}
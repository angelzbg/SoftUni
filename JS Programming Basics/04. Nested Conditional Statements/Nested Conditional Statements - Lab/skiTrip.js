(input) => {
    const days = Number(input.shift()) - 1;
    const type = input.shift();
    const grade = input.shift();

    const prices = {
        'room for one person': 18,
        'apartment': 25,
        'president apartment': 35
    };

    let price = days * prices[type];

    if(days < 10) {
        if(type === 'apartment') price*=0.7;
        else if(type === 'president apartment') price*=0.9;
    } else if(days < 16) {
        if(type === 'apartment') price*=0.65;
        else if(type === 'president apartment') price*=0.85;
    } else {
        if(type === 'apartment') price/=2;
        else if(type === 'president apartment') price*=0.8;
    }

    if(grade === 'positive') price*=1.25;
    else price*=0.9;

    console.log(price.toFixed(2));
}
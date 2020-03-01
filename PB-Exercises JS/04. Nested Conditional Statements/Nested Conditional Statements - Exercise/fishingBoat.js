(input) => {
    const budget = Number(input.shift());
    const season = input.shift();
    const count = Number(input.shift());

    const table = {
        'Spring': 3000,
        'Summer': 4200,
        'Autumn': 4200,
        'Winter': 2600
    }

    let percent = 1;
    if(count <= 6) percent-=0.1;
    else if(count <= 11) percent-=0.15;
    else percent-=0.25;
    
    let price = table[season] * percent;

    if(count % 2 == 0 && season !== 'Autumn') price*=0.95;

    if(budget < price) console.log(`Not enough money! You need ${(price-budget).toFixed(2)} leva.`);
    else console.log(`Yes! You have ${(budget-price).toFixed(2)} leva left.`);
}
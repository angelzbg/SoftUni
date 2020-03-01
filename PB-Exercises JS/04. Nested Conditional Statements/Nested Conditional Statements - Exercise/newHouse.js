(input) => {
    const type = input.shift();
    const count = Number(input.shift());
    const budget = Number(input.shift());
    const table = {
        'Roses': { price: 5, mult: count > 80, percent: -0.10 },
        'Dahlias': { price: 3.8, mult: count > 90, percent: -0.15 },
        'Tulips': { price: 2.8, mult: count > 80, percent: -0.15 },
        'Narcissus': { price: 3, mult: count < 120, percent: 0.15 },
        'Gladiolus': { price: 2.5, mult: count < 80, percent: 0.20 }
    };
    
    const price = count * table[type].price * ( table[type].mult ? 1 + table[type].percent : 1 );

    if(budget >= price) console.log(`Hey, you have a great garden with ${count} ${type} and ${(budget-price).toFixed(2)} leva left.`);
    else console.log(`Not enough money, you need ${(price-budget).toFixed(2)} leva more.`);
}
(input) => {
    const budget = Number(input.shift());
    let statists = Number(input.shift()), pricePerStatist = Number(input.shift());
    let priceDecor = budget*0.1;
    let priceTotalStatists = statists*pricePerStatist;
    if(statists > 150) priceTotalStatists*=0.9;
    const totalPrice = priceDecor+priceTotalStatists;
    if(totalPrice > budget) {
        console.log('Not enough money!');
        console.log(`Wingard needs ${(totalPrice-budget).toFixed(2)} leva more.`);
    } else {
        console.log('Action!');
        console.log(`Wingard starts filming with ${(budget-totalPrice).toFixed(2)} leva left.`);
    }
}
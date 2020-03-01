(input) => {
    const n = Number(input.shift());
    const price = Number(input.shift());
    const priceToy = Number(input.shift());

    const toys = Math.round(n/2);
    const moneyTimes = Math.floor(n/2);

    let money = 0;
    for(let i=1; i<=moneyTimes; i++) money+=i*10;
    money += toys*priceToy - moneyTimes; // - moneyTimes batkoto kradec

    console.log(money >= price ? `Yes! ${(money-price).toFixed(2)}` : `No! ${(price-money).toFixed(2)}`);
}
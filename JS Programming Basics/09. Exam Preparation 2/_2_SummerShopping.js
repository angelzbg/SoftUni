(input) => {
    let budget = Number(input.shift()),
        priceTowel = Number(input.shift()),
        percent = Number(input.shift())/100,
        priceUmbrella = priceTowel*(2/3),
        priceFlops = priceUmbrella*0.75,
        priceBag = (priceFlops+priceTowel)/3;
    let total = (priceTowel+priceUmbrella+priceFlops+priceBag)*(1-percent);
    if(budget >= total) console.log(`Annie's sum is ${total.toFixed(2)} lv. She has ${(budget-total).toFixed(2)} lv. left.`);
    else console.log(`Annie's sum is ${total.toFixed(2)} lv. She needs ${(total-budget).toFixed(2)} lv. more.`);
}
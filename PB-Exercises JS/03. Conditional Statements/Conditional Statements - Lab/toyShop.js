(input) => {
    const priceTrip = Number(input.shift()),
            countPuzzles = Number(input.shift()),
            countDolls = Number(input.shift()),
            countBears = Number(input.shift()),
            countMinions = Number(input.shift()),
            countTrucks = Number(input.shift());
    let totalPrice = countPuzzles*2.6 + countDolls*3 + countBears*4.1 + countMinions*8.2 + countTrucks*2;
    if(countPuzzles + countDolls + countBears + countMinions + countTrucks > 49) totalPrice*=0.75;
    totalPrice*=0.90;
    if(totalPrice >= priceTrip) console.log(`Yes! ${(totalPrice-priceTrip).toFixed(2)} lv left.`);
    else console.log(`Not enough money! ${(priceTrip-totalPrice).toFixed(2)} lv needed.`);
}
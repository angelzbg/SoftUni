bitcoinMining = (arrIn) => {
    let array = arrIn.slice(0, 999);
    let dayCounter = 0;
    let totalGold = 0;
    let money = 0;
    let bitcoins = 0;
    let moneyLeft = 0;
    let firstCoinDay = 0;
    let bool = true;
    array.forEach((gold, index) => {
        dayCounter = index + 1;
        if (dayCounter % 3 == 0) {
            gold = gold * 0.7;
        }
        totalGold += gold;
        money = totalGold * 67.51;
 
        if (money >= 11949.16 && bool == true) {
            firstCoinDay = dayCounter;
            bool = false;
        }
    });

    bitcoins = Math.floor(money / 11949.16);
    moneyLeft = (money % 11949.16).toFixed(2);
 
    console.log(`Bought bitcoins: ${bitcoins}`);
    if (bitcoins > 0) {
        console.log(`Day of the first purchased bitcoin: ${firstCoinDay}`);
    }
    console.log(`Left money: ${moneyLeft} lv.`);
}
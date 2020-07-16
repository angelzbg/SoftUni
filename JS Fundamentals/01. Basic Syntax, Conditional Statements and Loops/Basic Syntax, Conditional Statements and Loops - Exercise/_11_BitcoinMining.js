bitcoinMining = (array = []) => {
    let gold = (money = 0);
    let firstDay;

    for (let i = 0; i < array.length; i++) {
        let counter = i + 1,
            g = array[i];
        if (counter % 3 == 0) {
            g *= 0.7;
        }
        gold += g;
        money = gold * 67.51;

        if (money >= 11949.16 && !firstDay) {
            firstDay = counter;
        }
    }

    let coins = Math.floor(money / 11949.16);
    let leftMoney = (money % 11949.16).toFixed(2);

    console.log(`Bought bitcoins: ${coins}`);
    if (coins > 0) {
        console.log(`Day of the first purchased bitcoin: ${firstDay}`);
    }

    console.log(`Left money: ${leftMoney} lv.`);
};

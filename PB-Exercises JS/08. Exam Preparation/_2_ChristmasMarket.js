(input) => {
    const   needed = +input.shift(),
            fantasy = +input.shift(),
            horror = +input.shift(),
            romance = +input.shift();

    let money = (fantasy*14.9 + horror*9.8 + romance*4.3) * 0.8;
    if(money >= needed) {
        let bonus = Math.floor((money - needed) / 10); // 10% = 1/10
        money-=bonus;
        console.log(`${money.toFixed(2)} leva donated.\nSellers will receive ${bonus} leva.`);
    } else {
        console.log(`${(needed-money).toFixed(2)} money needed.`);
    }
}
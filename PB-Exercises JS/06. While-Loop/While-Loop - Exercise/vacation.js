(input) => {
    const moneyTrip = Number(input.shift());
    let money = Number(input.shift());
    let spendCounter = 0, days = 0;

    const iterations = input.length/2;
    for(let i=0; i<iterations; i++) {
        let cmd = input.shift();
        let amount = Number(input.shift());
        days++;

        if(cmd === 'spend') {
            if(++spendCounter == 5) {
                console.log(`You can't save the money.\n${days}`);
                break;
            }
            money -= amount;
            if(money < 0) money = 0;
        } else { // save
            spendCounter = 0;
            money+=amount;
            if(money >= moneyTrip) {
                console.log(`You saved the money for ${days} days.`);
                break;
            }
        }
    }
}
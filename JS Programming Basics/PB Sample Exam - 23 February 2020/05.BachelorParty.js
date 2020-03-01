(input) => {
    let priceTalent = Number(input.shift()), totalPrice = 0, guests = 0;
    let line = input.shift();
    while(line !== 'The restaurant is full') {
        let count = Number(line);
        guests += count;
        if(count < 5) totalPrice += count*100;
        else totalPrice += count*70;

        line = input.shift();
    }

    if(totalPrice >= priceTalent) console.log(`You have ${guests} guests and ${totalPrice-priceTalent} leva left.`);
    else console.log(`You have ${guests} guests and ${totalPrice} leva income, but no singer.`);
}
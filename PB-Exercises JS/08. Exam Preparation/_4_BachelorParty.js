(input) => {
    const guestPrice = +input.shift();

    let line = input.shift(), price = 0, guests = 0;
    while(line !== 'The restaurant is full') {
        let group = Number(line);

        if(group < 5) price += group*100;
        else price += group*70;

        guests += group;

        line = input.shift();
    }

    let diff = price - guestPrice;
    if(diff >= 0) console.log(`You have ${guests} guests and ${diff} leva left.`);
    else console.log(`You have ${guests} guests and ${price} leva income, but no singer.`);
}
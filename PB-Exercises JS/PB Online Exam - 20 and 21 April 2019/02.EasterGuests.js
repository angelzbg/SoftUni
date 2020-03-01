(input) => {
    let guests = Number(input.shift()), budget = Number(input.shift()), kozunaci = Math.ceil(guests/3), qica = guests*2;

    let price = kozunaci*4 + qica*0.45, diff = budget - price;

    if(diff >= 0) console.log(`Lyubo bought ${kozunaci} Easter bread and ${qica} eggs.\nHe has ${diff.toFixed(2)} lv. left.`);
    else console.log(`Lyubo doesn't have enough money.\nHe needs ${Math.abs(diff).toFixed(2)} lv. more.`);
}
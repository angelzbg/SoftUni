(input) => {
    let guests = Number(input.shift()),
        priceX1 = Number(input.shift()),
        budget = Number(input.shift()),
        cake = budget*0.10;
    
    if(guests > 20) priceX1 *= 0.75;
    else if(guests > 15) priceX1 *= 0.80;
    else if(guests > 9) priceX1 *= 0.85;

    let price = cake + priceX1*guests;
    let diff = budget - price;

    if(diff >= 0) console.log(`It is party time! ${diff.toFixed(2)} leva left.`);
    else console.log(`No party! ${Math.abs(diff).toFixed(2)} leva needed.`);
}
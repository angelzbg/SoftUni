(input) => {
    let buyers = Number(input.shift()), price = 0;
    let table = {
        'basket': 1.50,
        'wreath': 3.80,
        'chocolate bunny': 7.00
    };
    for(let i=0; i<buyers; i++) {
        let count = 0;
        let sum = 0;
        let item = input.shift();
        while(item !== 'Finish') {
            sum += table[item];
            count++;
            item = input.shift();
        }
        if(count % 2 === 0) sum *= 0.8;
        price += sum;
        console.log(`You purchased ${count} items for ${sum.toFixed(2)} leva.`);
    }

    console.log(`Average bill per client is: ${(price/buyers).toFixed(2)} leva.`);
}
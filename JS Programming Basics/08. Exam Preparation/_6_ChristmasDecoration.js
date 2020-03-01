(input) => {
    let budget = +input.shift();
    
    let l = input.shift(), notEnough = false;
    while(l !== 'Stop') {

        let currentPrice = 0;
        for(let i=0; i<l.length; i++) {
            currentPrice += l.charCodeAt(i);
        }

        if(budget - currentPrice >= 0) {
            budget-=currentPrice;
            console.log('Item successfully purchased!');
        } else {
            console.log('Not enough money!');
            notEnough = true;
            break;
        }

        l = input.shift();
    }

    if(!notEnough) console.log(`Money left: ${budget}`);
}
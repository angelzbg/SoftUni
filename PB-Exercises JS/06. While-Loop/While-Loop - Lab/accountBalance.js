(input) => {
    const n = Number(input.shift());
    let total = 0;
    for(let i=0; i<n; i++) {
        let amount = Number(input.shift());
        if(amount < 0) {
            console.log('Invalid operation!');
            break;
        } else {
            console.log('Increase: ' + amount.toFixed(2));
            total+=amount;
        }
    }
    console.log('Total: ' + total.toFixed(2));
}
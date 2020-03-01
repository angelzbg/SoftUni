(input) => {
    let coin = Math.round(input.shift() * 100);
    const coins = [ 200, 100, 50, 20, 10, 5, 2, 1 ];
    let count = 0;
    for(let i=0; i<8; i++) {
        while(coin - coins[i] >= 0) {
            coin-=coins[i];
            count++;
        }
        if(coin == 0) break;
    }
    console.log(count);
}
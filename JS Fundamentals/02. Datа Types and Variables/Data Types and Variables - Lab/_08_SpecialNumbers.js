specialNumbers = (n) => {
    for(let i=1; i<=n; i++) {
        let sum = i.toString().split('').map(Number).reduce((a, b) => a + b, 0)
        if(sum == 5 || sum == 7 || sum == 11) console.log(`${i} -> True`);
        else console.log(`${i} -> False`);
    }
}
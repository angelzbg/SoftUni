(n) => {
    for(let i=1; i<=n; i++) {
        let numStr = i + '';
        let sum = 0;
        for(let j=0; j<numStr.length; j++) sum += Number(numStr[j]);
        if(sum == 5 || sum == 7 || sum == 11) console.log(`${i} -> True`);
        else console.log(`${i} -> False`);
    }
}
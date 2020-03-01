(input) => {
    let sumOdd = 0, sumEven = 0;
    input.slice(1).map(el => { return Number(el) }).forEach( (n, i) => {
        if(i % 2 == 0) sumEven+=n;
        else sumOdd+=n;
    });
    console.log(sumOdd == sumEven ? `Yes\nSum = ${sumOdd}` : `No\nDiff = ${Math.abs(sumOdd-sumEven)}`);
}
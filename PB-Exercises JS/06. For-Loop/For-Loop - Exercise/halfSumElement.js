(input) => {
    const a = input.slice(1).map( el => { return Number(el) });
    let sum = a.reduce( (a, b) => { return a+b; }, 0 );
    const len = a.length;
    let currentSum = 0;
    for(let i=0; i<len; i++) {
        currentSum = sum - a[i];
        if(currentSum == a[i]) {
            console.log(`Yes\nSum = ${a[i]}`);
            currentSum = Number.MIN_SAFE_INTEGER;
            break;
        }
    }
    if(currentSum != Number.MIN_SAFE_INTEGER) {
        const max = Math.max(...a);
        console.log(`No\nDiff = ${Math.abs(max - (sum-max))}`);
    }
}
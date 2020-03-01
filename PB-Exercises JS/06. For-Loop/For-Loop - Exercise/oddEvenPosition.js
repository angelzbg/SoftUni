(input) => {
    const a = input.slice(1).map( el => { return Number(el) });
    let even = [], odd = [];
    a.forEach( (num, i) => {
        if( (i+1) % 2 == 0) even.push(num);
        else odd.push(num);
    });

    const oddSum = odd.reduce( (a, b) => { return a+b }, 0 ),
            oddMin = oddSum != 0 ? Math.min(...odd) : 'No',
            oddMax = oddSum != 0 ? Math.max(...odd) : 'No',
            evenSum = even.reduce( (a, b) => { return a+b }, 0 ),
            evenMin = evenSum != 0 ? Math.min(...even) : 'No',
            evenMax = evenSum != 0 ? Math.max(...even) : 'No';

    console.log(`OddSum=${oddSum.toFixed(2)},`);
    console.log(`OddMin=${isNaN(oddMin) ? oddMin : oddMin.toFixed(2)},`);
    console.log(`OddMax=${isNaN(oddMax) ? oddMax : oddMax.toFixed(2)},`);
    console.log(`EvenSum=${evenSum.toFixed(2)},`);
    console.log(`EvenMin=${isNaN(evenMin) ? evenMin : evenMin.toFixed(2)},`);
    console.log(`EvenMax=${isNaN(evenMax) ? evenMax : evenMax.toFixed(2)}`);
}
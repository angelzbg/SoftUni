(input) => {
    const a = input.slice(1).map( el => { return Number(el) });
    const middle = a.length/2;
    const sumL = a.slice(0, middle).reduce((a,b) => { return Number(a)+Number(b)}, 0),
            sumR = a.slice(middle).reduce((a,b) => { return Number(a)+Number(b)}, 0);
    const diff = sumL-sumR;
    console.log(diff != 0 ? `No, diff = ${Math.abs(diff)}` : `Yes, sum = ${sumL}` );
}
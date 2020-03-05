(num) => {
    let divisors = [];
    for(let i=1; i<=Math.floor(num/2); i++) {
        if(Number.isInteger(num/i)) divisors.push(i);
    }
    console.log( divisors.reduce((a, b) => a + b, 0) === num ? 'We have a perfect number!' : "It's not so perfect." );
}
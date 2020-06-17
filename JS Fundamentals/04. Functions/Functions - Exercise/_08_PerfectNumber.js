perfectNumber = (num) => {
    let sum = 0;
    const half = Math.floor(num / 2);
    for(let divisor = 1; divisor <= half; divisor++) {
        if(Number.isInteger(num / divisor)) {
            sum += divisor;
        }
    }
    console.log(sum === num ? 'We have a perfect number!' : "It's not so perfect.");
}
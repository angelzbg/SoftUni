sameNumbers = (number = 1) => {
    const allDigits =
        number
        .toString()
        .split('')
        .map(Number);

    const uniqueDigits = new Set(allDigits);
    
    console.log(uniqueDigits.size === 1);
    console.log(allDigits.reduce((a, b) => a + b, 0));
};
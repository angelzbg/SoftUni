sumDigits = (num = 1) => {
    console.log(num.toString().split('').map(Number).reduce((a, b) => a + b, 0));
};
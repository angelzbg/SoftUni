sumDigits = (num) => {
    console.log(num.toString().split('').map(Number).reduce((a, b) => a + b, 0));
};
sumDigits = (num = 1) => {
    return num
        .toString()
        .split('')
        .map(Number)
        .reduce((a, b) => a + b, 0);
};

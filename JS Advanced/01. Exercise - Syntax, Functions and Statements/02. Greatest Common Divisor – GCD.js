GCD = (num1 = 1, num2 = 1) => {
    let [a, b] = [Math.max(num1, num2), Math.min(num1, num2)];
    while (b > 0) {
        [a, b] = [b, a % b];
    }

    console.log(a);
};

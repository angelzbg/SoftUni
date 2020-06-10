factorialDivision = (num1, num2) => {
    let factorial = (n) => {
        if (n === 0 || n === 1) {
            return 1;
        }
        return factorial(n-1)*n;
    };
    console.log((factorial(num1) / factorial(num2)).toFixed(2));
};
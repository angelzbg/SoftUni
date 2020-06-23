factorialDivision = (num1 = 1, num2 = 1) => {
    const factorial = (n = 1) => {
        if (n === 0 || n === 1) {
            return 1;
        }
        
        return factorial(n - 1) * n;
    };

    console.log((factorial(num1) / factorial(num2)).toFixed(2));
};
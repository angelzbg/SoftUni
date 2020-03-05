(num1, num2, operator) => {
    let MyMath = {
        'multiply': (n1, n2) => n1*n2,
        'divide': (n1, n2) => n1/n2,
        'add': (n1, n2) => n1+n2,
        'subtract': (n1, n2) => n1-n2
    };
    console.log(MyMath[operator](num1, num2));
}
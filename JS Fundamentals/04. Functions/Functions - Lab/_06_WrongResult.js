(num1, num2, num3) => {
    // Няма никакъв смисъл да извършвам 100 проверки, но да не направя 2 умножения...
    let result = num1*num2*num3;
    console.log( result < 0 ? 'Negative' : 'Positive' );
}
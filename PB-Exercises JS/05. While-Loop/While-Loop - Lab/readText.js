(input) => {
    let num = Number(input.shift());
    while(num < 1 || num > 100) {
        console.log('Invalid Number!');
        num = Number(input.shift());
    }
    console.log(`The number is: ${num}`);
}
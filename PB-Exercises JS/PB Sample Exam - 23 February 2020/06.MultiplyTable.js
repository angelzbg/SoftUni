(input) => {
    let num = input.shift();
    let num1 = Number(num.charAt(2)), num2 = Number(num.charAt(1)), num3 = Number(num.charAt(0));
    for(let i=1; i<=num1; i++) {
        for(let j=1; j<=num2; j++) {
            for(let k=1; k<=num3; k++) {
                console.log(`${i} * ${j} * ${k} = ${i*j*k};`);
            }
        }
    }
}
(input) => {
    const n1 = Number(input.shift());
    const n2 = Number(input.shift());
    const action = input.shift();

    let result = 0;

    switch(action) {
        case '+':
            result = n1+n2;
            console.log(`${n1} + ${n2} = ${result} - ${result%2==0 ? 'even' : 'odd'}`);
            break;
        case '-':
            result = n1-n2;
            console.log(`${n1} - ${n2} = ${result} - ${result%2==0 ? 'even' : 'odd'}`);
            break;
        case '*':
            result = n1*n2;
            console.log(`${n1} * ${n2} = ${result} - ${result%2==0 ? 'even' : 'odd'}`);
            break;
        case '/':
            if(n2 == 0) console.log(`Cannot divide ${n1} by zero`);
            else {
                result = n1/n2;
                console.log(`${n1} / ${n2} = ${result.toFixed(2)}`);
            }
            break;
        case '%':
            if(n2 == 0) console.log(`Cannot divide ${n1} by zero`);
            else {
                result = n1 % n2;
                console.log(`${n1} % ${n2} = ${result}`);
            }
            break;
    }
}
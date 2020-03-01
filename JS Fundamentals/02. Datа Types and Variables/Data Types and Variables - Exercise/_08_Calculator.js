(n1, action, n2) => {
    let result = 0;
    switch(action) {
        case '-':
            result = n1 - n2;
            break;
        case '+':
            result = n1 + n2;
            break;
        case '/':
            result = n1 / n2;
            break;
        case '*':
            result = n1 * n2;
            break;
        default: // '%'
            result = n1 % n2;
    }
    console.log(result.toFixed(2));
}
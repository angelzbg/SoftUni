calculator = (n1 = 1, action = '', n2 = 1) => {
    let calculator = {
        '-': () => n1 - n2,
        '+': () => n1 + n2,
        '/': () => n1 / n2,
        '*': () => n1 * n2,
        '%': () => n1 % n2,
    };

    console.log(calculator[action]().toFixed(2));
};

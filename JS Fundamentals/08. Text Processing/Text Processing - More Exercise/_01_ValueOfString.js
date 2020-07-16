valueOfString = ([string = '', type = '']) => {
    let pattern = type === 'UPPERCASE' ? /[A-Z]/g : /[a-z]/g;
    let sum = 0;

    string.match(pattern).forEach((letter) => {
        sum += letter.charCodeAt(0);
    });

    console.log(`The total sum is: ${sum}`);
};

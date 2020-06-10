asciiSumator = ([ char1, char2, symbols ]) => {
    char1 = char1.charCodeAt(0);
    char2 = char2.charCodeAt(0);
    symbols = symbols.split('').map(ch => ch.charCodeAt(0));
    let sum = 0;
    symbols.forEach(code => {
        if(code > char1 && code < char2 || code > char2 && code < char1) {
            sum += code;
        }
    });
    console.log(sum);
};
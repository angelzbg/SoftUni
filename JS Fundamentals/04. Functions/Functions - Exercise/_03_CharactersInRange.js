charactersInRange = (ch1 = '', ch2 = '') => {
    let code1 = ch1.charCodeAt(0),
        code2 = ch2.charCodeAt(0);
    let start = code1 < code2 ? code1 : code2,
        end = start !== code1 ? code1 : code2,
        output = '';

    for (let i = start + 1; i < end; i++) {
        output += String.fromCharCode(i) + ' ';
    }

    console.log(output);
};

numbersFromNto1 = (n = 1) => {
    let output = '';
    while(n > 0) {
        output += `${n--}\n`;
    }
    
    console.log(output);
};
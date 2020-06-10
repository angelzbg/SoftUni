numbersFromNto1 = (n) => {
    let output = '';
    while(n > 0) {
        output += `${n--}\n`;
    }
    
    console.log(output);
};
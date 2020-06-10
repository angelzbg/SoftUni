divisibleBy3 = () => {
    let output = '3';
    for(let i = 6; i < 101; i += 3) {
        output += `\n${i}`;
    }
    
    console.log(output);
};
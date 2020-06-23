multiplicationTable = (num = 1) => {
    let output = '';
    for(let i = 1; i < 11; i++) {
        output += `${num} X ${i} = ${num * i}\n`;
    }
    
    console.log(output);
};
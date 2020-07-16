triangleOfNumbers = (num = 1) => {
    let output = '';
    for (let row = 1; row <= num; row++) {
        for (let col = 0; col < row; col++) {
            output += `${row} `;
        }
        output += '\n';
    }

    console.log(output);
};

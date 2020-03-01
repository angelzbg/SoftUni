(num) => {
    let output = '';
    for(let row = 1; row <= num; row++) {
        for(let col = 0; col < row; col++) {
            output += `${row} `;
        }
        //output.trim(); // softuni trqbva da si ima trim
        output += '\n';
    }
    console.log(output);
}
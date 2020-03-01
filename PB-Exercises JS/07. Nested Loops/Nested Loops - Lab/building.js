(input) => {
    const rows = Number(input.shift()), cols = Number(input.shift());
    for(let r=rows; r>0; r--) {
        let output = '';
        for(let c=0; c<cols; c++) {
            output += (r == rows ? 'L' : r % 2 == 0 ? 'O' : 'A' ) + r + c + ' ';
        }
        console.log(output);
    }
}
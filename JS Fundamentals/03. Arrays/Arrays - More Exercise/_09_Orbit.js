orbit = ([w, h, x, y]) => {
    let rows = w;
    let cols = h;
    let starRow = x;
    let starCol = y;
 
    let matrix = [];
    for(let i=0; i<rows; i++) matrix.push([]);
 
    for(let row = 0; row< rows; row++) {
        for(let col=0; col<cols; col++) {
            matrix[row][col] = Math.max(Math.abs(row - starRow), Math.abs(col - starCol)) + 1;
        }
    }
 
    matrix.forEach(row => console.log(row.join(' ')));
}
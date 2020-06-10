equalNeighbors = (matrix) => {
    let count = 0;
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[0].length; j++) {
            if(matrix[i][j] === matrix[i][j+1]) {
                count++;
            }
            
            if(matrix[i+1] && matrix[i][j] === matrix[i+1][j]) {
                count++;
            }
        }
    }

    console.log(count);
};
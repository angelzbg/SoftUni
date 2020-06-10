bunnyKill = (matrix) => {
    let snowBallDamage = 0;
    let killedBunnies = 0;
    let coor = matrix.pop().split(' ').map(c => c.split(',').map(Number));
    matrix = matrix.map(row => row.split(' ').map(Number));
    
    let matrixRow = matrix.length;
    let matrixCol = matrix[0].length;
    for (let i = 0; i < coor.length; i++) {
        let bombRow = coor[i][0];
        let bombCol = coor[i][1];
        let bombValue = matrix[bombRow][bombCol];
        if (bombValue > 0) {
            for (let row = bombRow - 1; row <= bombRow + 1; row++) {
                for (let col = bombCol - 1; col <= bombCol + 1; col++) {
                    if ((row >= 0) && (col >= 0) && (row < matrixRow) && (col < matrixCol)) {
                        matrix[row][col] -= bombValue;
                    }
                }
            }
            killedBunnies++;
            snowBallDamage += bombValue;
        }
    }

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] > 0) {
                snowBallDamage += matrix[row][col];
                killedBunnies++;
            }
        }
    }

    console.log(`${snowBallDamage}\n${killedBunnies}`);
};
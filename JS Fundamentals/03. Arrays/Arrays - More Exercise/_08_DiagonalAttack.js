diagonalAttack = (arr) => {
    let matrix = [], len = arr.length;
    for(let i=0; i<len; i++) {
        let row = arr.shift().split(' ').map(el => Number(el));
        matrix.push(row);
    }

    let sumMain = 0, sumSecond = 0;
    for(let i=0; i<len; i++) {
        for(let j=0; j<len; j++) {
            if(i === j) sumMain += matrix[i][j];
            if(i+j === len-1) sumSecond += matrix[i][j];
        }
    }

    if(sumMain === sumSecond) {
        for(let i=0; i<len; i++) {
            for(let j=0; j<len; j++) {
                if(i === j ||  i+j === len-1) continue;
                matrix[i][j] = sumMain;
            }
        }
    }

    matrix.forEach(row => console.log(row.join(' ')));
}
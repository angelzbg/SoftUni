(rows, cols) => {
    let count=0, maxCount=rows*cols, minRow=0, minCol=0, maxRow=rows-1, maxCol=cols-1;

    let matrix = [];
    for (let i = 0; i < rows; i++) matrix.push([]);

    while (count < maxCount) {
        for (let c = minCol; c <= maxCol && count < maxCount; c++)	matrix[minRow][c] = ++count;
        minRow++;
        for (let r = minRow; r <= maxRow && count < maxCount; r++)	matrix[r][maxCol] = ++count;
        maxCol--;
        for (let c = maxCol; c >= minCol && count < maxCount; c--)	matrix[maxRow][c] = ++count;
        maxRow--;
        for (let r = maxRow; r >= minRow && count < maxCount; r--)	matrix[r][minCol] = ++count;
        minCol++;
    }

    matrix.forEach(r => console.log(r.join(' ')));
}
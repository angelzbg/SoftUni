diagonalSums = (matrix = []) => {
    let [sumMain, sumSecondary] = [0, 0];
    matrix.forEach((row, idx) => {
        sumMain += row[idx];
        sumSecondary += row[matrix.length - 1 - idx];
    });

    return `${sumMain} ${sumSecondary}`;
};

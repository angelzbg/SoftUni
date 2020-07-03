equalNeighbors = (matrix = []) => {
    let pairs = 0;
    matrix.forEach((arr, row) => {
        arr.forEach((el, col) => {
            // if next element in the current row
            if (el === arr[col + 1]) {
                pairs++;
            }
            // if element on the next row same position
            if (matrix[row + 1] && matrix[row + 1][col] === el) {
                pairs++;
            }
        });
    });

    return pairs;
};

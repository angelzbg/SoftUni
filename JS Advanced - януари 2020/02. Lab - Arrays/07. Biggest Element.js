biggestElement = (matrix = []) => {
    return Math.max(...matrix.map((row) => Math.max(...row)));
};

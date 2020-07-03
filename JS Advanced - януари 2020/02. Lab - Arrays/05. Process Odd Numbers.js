processOddNumbers = (numbers = []) => {
    return numbers
        .map((num, idx) => {
            if (idx % 2 !== 0) {
                return num * 2;
            }
        })
        .reverse()
        .join(' ');
};

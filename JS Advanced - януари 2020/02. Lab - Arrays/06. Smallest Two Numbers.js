smallestTwoNumbers = (numbers = []) => {
    return numbers
        .sort((a, b) => a - b)
        .slice(0, 2)
        .join(' ');
};
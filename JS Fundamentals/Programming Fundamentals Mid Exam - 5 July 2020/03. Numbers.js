numbers = (input = '') => {
    const arr = input.split(' ').map(Number);
    const avg = arr.reduce((acc, val) => acc + val, 0) / arr.length;
    const top5 = arr
        .filter((x) => x > avg)
        .sort((a, b) => b - a)
        .slice(0, 5);

    return top5.length ? top5.join(' ') : 'No';
};

console.log(numbers('-1 -2 -3 -4 -5 -6'));

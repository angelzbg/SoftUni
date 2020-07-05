arrayModifier = (input = []) => {
    let arr = input.shift().split(' ').map(Number);

    while (([cmd, idx1, idx2] = input.shift().split(' '))[0] !== 'end') {
        if (cmd === 'swap') {
            [idx1, idx2] = [idx1, idx2].map(Number);
            [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
        } else if (cmd === 'multiply') {
            [idx1, idx2] = [idx1, idx2].map(Number);
            arr[idx1] = arr[idx1] * arr[idx2];
        } else {
            // 'decrease'
            arr = arr.map((x) => x - 1);
        }
    }

    return arr.join(', ');
};

console.log(
    arrayModifier([
        '23 -2 321 87 42 90 -123',
        'swap 1 3',
        'swap 3 6',
        'swap 1 0',
        'multiply 1 2',
        'multiply 2 1',
        'decrease',
        'end',
    ]),
);

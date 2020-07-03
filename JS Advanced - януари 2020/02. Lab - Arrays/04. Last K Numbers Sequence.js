lastKNumbersSequence = (n = 0, k = 0) => {
    let sequence = [];
    for (let i = 0; i < n; i++) {
        let num = sequence.slice(i >= k ? i - k : 0, i).reduce((a, b) => a + b, 0);
        sequence.push(num > 0 ? num : 1);
    }

    return sequence.join(' ');
};

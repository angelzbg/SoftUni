lastKNumbersSequence = (n, k) => {
    let numbers = [ 1 ];

    for(let i=1; i<n; i++) {
        let sum = 0;
        for(let j=i-1; j>i-1-k; j--) {
            sum += numbers[j] || 0;
        }

        numbers.push(sum);
    }

    console.log(numbers.join(' '));
}
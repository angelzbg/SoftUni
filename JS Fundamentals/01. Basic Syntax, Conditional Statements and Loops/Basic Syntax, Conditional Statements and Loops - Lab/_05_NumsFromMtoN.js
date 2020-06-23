numbersFromMtoN = (m = 1, n = 1) => {
    let output = '';
    for(let i = m; i >= n; i--) {
        output += i + '\n';
    }
    
    console.log(output);
};
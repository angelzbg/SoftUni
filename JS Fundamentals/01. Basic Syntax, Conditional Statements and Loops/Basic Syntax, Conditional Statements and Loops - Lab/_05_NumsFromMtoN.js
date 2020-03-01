(m, n) => {
    // m > n always
    let output = '';
    for(let i=m; i>=n; i--) output += i + '\n';
    console.log(output);
}
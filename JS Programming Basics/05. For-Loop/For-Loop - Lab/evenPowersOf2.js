(input) => {
    const n = Number(input.shift())+1;
    let output = '1\n';
    for(let i=2; i<n; i+=2) {
        output += Math.pow(2, i) + '\n';
    }
    console.log(output);
}
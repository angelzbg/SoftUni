(n) => {
    let num = 1, sum = 1, output = '1';
    for(let i=1; i<n; i++) {
        num += 2;
        output += `\n${num}`;
        sum += num;
    }
    output += `\nSum: ${sum}`;
    console.log(output);
}
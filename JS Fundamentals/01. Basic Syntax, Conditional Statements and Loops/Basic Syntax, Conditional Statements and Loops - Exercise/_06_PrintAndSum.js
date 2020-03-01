(start, end) => {
    let output = '', sum = 0;
    for(let i=start; i<=end; i++) {
        output += `${i} `;
        sum += i;
    }
    console.log(`${output}\nSum: ${sum}`);
}
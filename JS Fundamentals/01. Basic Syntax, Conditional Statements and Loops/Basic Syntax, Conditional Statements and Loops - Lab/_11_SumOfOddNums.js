sumOfOddNums = (n = 1) => {
    let [num, sum, output] = [1, 1, '1'];
    for(let i = 1; i < n; i++) {
        num += 2;
        output += `\n${num}`;
        sum += num;
    }
    
    console.log(`${output}\nSum: ${sum}`);
};
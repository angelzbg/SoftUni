(num) => {
    let numStr = num + '';
    let len = numStr.length;
    let sum = 0;
    for(let i=0; i<len; i++) {
        sum += Number(numStr[i]);
    }
    console.log(sum);
}
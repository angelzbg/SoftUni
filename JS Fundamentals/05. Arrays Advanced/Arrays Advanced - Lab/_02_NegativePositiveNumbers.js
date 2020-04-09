negativeOrPositiveNumbers = (arr) => {
    let positive = [], negative = [];
    arr.forEach(num => {
        if(num < 0) negative.splice(0, 0, num);
        else positive.push(num);
    });
    console.log(`${negative.join('\n')}\n${positive.join('\n')}`);
}
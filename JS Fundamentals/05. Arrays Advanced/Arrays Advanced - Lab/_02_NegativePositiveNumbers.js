negativeOrPositiveNumbers = (arr) => {
    let result = [];
    arr.forEach(num => {
        if(num < 0) {
            result.unshift(num);
        } else {
            result.push(num);
        }
    });
    
    console.log(result.join('\n'));
};
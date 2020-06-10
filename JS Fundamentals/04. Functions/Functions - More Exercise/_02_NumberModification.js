numberModification = (n) => {
    let numStr = n.toString();
    let nums = numStr.split('').map(Number);
    let average = nums.reduce( (a, b) => a + b, 0 ) / nums.length;
    
    while(average < 5) {
        numStr += '9';
        nums = numStr.split('').map(Number);
        average = nums.reduce( (a, b) => a + b, 0 ) / nums.length;
    }

    console.log(numStr);
};
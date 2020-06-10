englishNameOfLastDigit = (num) => {
    let names = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ];
    let lastNum = num + '';
    lastNum = Number(lastNum[lastNum.length-1]);
    console.log(names[lastNum]);
};
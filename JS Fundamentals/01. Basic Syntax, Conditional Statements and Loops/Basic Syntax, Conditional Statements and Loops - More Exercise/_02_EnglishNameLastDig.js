englishNameOfLastDigit = (num = 1) => {
    const names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    console.log(names[Number(num.toString().split('').pop())]);
};

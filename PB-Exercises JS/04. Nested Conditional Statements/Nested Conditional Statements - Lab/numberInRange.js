(input) => {
    const num = Number(input.shift());
    console.log(num > -101 && num < 101 && num != 0 ? 'Yes' : 'No');
}
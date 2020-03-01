(input) => {
    const num = Number(input.shift());
    if(!(num > 99 && num < 201 || num == 0)) console.log('invalid');
}
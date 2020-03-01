(input) => {
    const num = Number(input.shift());
    if(num < 100) console.log('Less than 100');
    else if(num <= 200) console.log('Between 100 and 200');
    else console.log('Greater than 200');
}
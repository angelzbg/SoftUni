(input) => {
    let sum = 0;
    let line = input.shift();
    while(line !== 'Stop') {
        sum+=Number(line);
        line = input.shift();
    }
    console.log(sum);
}
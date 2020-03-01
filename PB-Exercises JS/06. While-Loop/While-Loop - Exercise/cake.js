(input) => {
    const _1 = Number(input.shift()), _2 = Number(input.shift());
    const cake = _1 * _2;

    let current = 0;

    let line = input.shift();
    while(line !== 'STOP') {
        current+=Number(line);
        if(current > cake) {
            console.log(`No more cake left! You need ${current-cake} pieces more.`);
            break;
        }
        line = input.shift();
    }
    if(current < cake) console.log(`${cake - current} pieces are left.`);
}
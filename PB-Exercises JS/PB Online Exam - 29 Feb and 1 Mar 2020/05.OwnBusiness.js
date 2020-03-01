(input) => {
    let width = Number(input.shift()),
        length = Number(input.shift()),
        height = Number(input.shift()),
        space = width*length*height,
        line = input.shift();

    while(line !== 'Done') {
        space -= Number(line);
        if(space < 0) return console.log(`No more free space! You need ${Math.abs(space)} Cubic meters more.`);
        line = input.shift();
    }
    console.log(`${space} Cubic meters left.`);
}
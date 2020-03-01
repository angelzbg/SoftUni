(input) => {
    let width = Number(input.shift()),
        length = Number(input.shift()),
        height = Number(input.shift()),
        avgHeight = Number(input.shift()),
        spaceship = width*length*height,
        astronauts = Math.floor(spaceship / (2*2*(avgHeight+0.4)));
    if(astronauts < 3) console.log('The spacecraft is too small.');
    else if(astronauts > 10) console.log('The spacecraft is too big.');
    else console.log(`The spacecraft holds ${astronauts} astronauts.`);
}
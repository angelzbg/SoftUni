(input) => {
    const width = Number(input.shift());
    const length = Number(input.shift());
    const height = Number(input.shift());

    const room = width*length*height;
    let luggage = 0;

    let line = input.shift();
    while(line !== 'Done') {
        luggage+=Number(line);
        if(luggage > room) break;
        line = input.shift();
    }

    if(luggage > room) console.log(`No more free space! You need ${luggage-room} Cubic meters more.`);
    else console.log(`${room-luggage} Cubic meters left.`);
}
(input) => {
    let p1 = Number(input.shift()),
        p2 = Number(input.shift());
    let winner = input.shift();
    while(winner !== 'End of battle') {
        if(winner === 'one') p2--;
        else p1--;
        if(p1 === 0) {
            console.log(`Player one is out of eggs. Player two has ${p2} eggs left.`);
            return;
        }
        if(p2 === 0) {
            console.log(`Player two is out of eggs. Player one has ${p1} eggs left.`);
            return;
        }
        winner = input.shift();
    }

    console.log(`Player one has ${p1} eggs left.\nPlayer two has ${p2} eggs left.`);
}
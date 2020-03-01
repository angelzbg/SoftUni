(input) => {
    let won = 0, lost = 0, drawn = 0;
    for(let i=0; i<3; i++) {
        let result = input.shift().split(':'),
            us = Number(result[0]),
            them = Number(result[1]);
        if(us > them) won++;
        else if(them > us) lost++;
        else drawn++;
    }
    console.log(`Team won ${won} games.\nTeam lost ${lost} games.\nDrawn games: ${drawn}`);
}
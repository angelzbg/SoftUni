thePyramid = (base, increment) => {
    let stone = marble = lapis = gold = row = 0;
 
    while (base > 2) {
        let requiredMarbel = base * 4 - 4;
        let requiredStone = base * base - requiredMarbel;
        stone += requiredStone;
 
        if(++row % 5 === 0) {
            lapis += requiredMarbel;
        } else {
            marble += requiredMarbel;
        }
        base -= 2;
    }
 
    console.log(
        `Stone required: ${Math.ceil(stone * increment)}` + 
        `\nMarble required: ${Math.ceil(marble * increment)}` +
        `\nLapis Lazuli required: ${Math.ceil(lapis * increment)}` +
        `\nGold required: ${Math.ceil(base * base * increment)}` +
        `\nFinal pyramid height: ${Math.floor(++row * increment)}`
        );
};
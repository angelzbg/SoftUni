counterStrike = (input) => {
    input = input.map(Number);
    let energy = input.shift();
    let battlesWon = 0;
    for(let i = 0; i < input.length; i++) {
        if(isNaN(input[i])) {
            break;
        } else if((newEnergy = energy - input[i]) >= 0) {
            energy = newEnergy + (++battlesWon % 3 === 0 ? i + 1 : 0);
        } else {
            return console.log(`Not enough energy! Game ends with ${battlesWon} won battles and ${energy} energy`);
        }
    }

    console.log(`Won battles: ${battlesWon}. Energy left: ${energy}`);
};

counterStrike([
    '100', '10', '10',
    '10',  '1',  '2',
    '3',   '73', '10'
  ]);



counterStrike([ '200', '54', '14', '28', '13', 'End of battle' ]);
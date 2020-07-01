wizardPoker = (input) => {
    let allCards = input.shift().split(':'),
        deck = [];
    while((cmd = input.shift().split(' '))[0] !== 'Ready') {
        if(cmd[0] === 'Add') {
            if(allCards.indexOf(cmd[1]) < 0) {
                console.log('Card not found.');
            } else {
                deck.push(cmd[1]);
            }
        } else if(cmd[0] === 'Insert') {
            let index = Number(cmd[2]);
            if(allCards.indexOf(cmd[1]) < 0 || index < 0 || index > deck.length) {
                console.log('Error!');
            } else {
                deck.splice(index, 0, cmd[1]);
            }
        } else if(cmd[0] === 'Remove') {
            let index = deck.indexOf(cmd[1]);
            if(index < 0) {
                console.log('Card not found.');
            } else {
                deck.splice(index, 1);
            }
        } else if(cmd[0] === 'Swap') {
            let [indexCard1, indexCard2] = [deck.indexOf(cmd[1]), deck.indexOf(cmd[2])];
            [deck[indexCard1], deck[indexCard2]] = [cmd[2], cmd[1]];
        } else { // 'Shuffle'
            deck.reverse();
        }
    }
    console.log(deck.join(' '));
}

wizardPoker([
  'Innervate:Moonfire:Pounce:Claw:Wrath:Bite',
  'Add Moonfire',
  'Add Pounce',
  'Add Bite',
  'Add Wrath',
  'Insert Claw 0',
  'Swap Claw Moonfire',
  'Remove Bite',
  'Shuffle deck',
  'Ready'
]);
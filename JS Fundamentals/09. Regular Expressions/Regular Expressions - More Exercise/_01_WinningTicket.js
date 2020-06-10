winningTicket = ([input]) => {
    let patternRepeat = /([@#\$\^])\1{5,9}/g;
    input = input.split(/[\s,]+/).forEach(ticket => {
        if(ticket.length === 20) {
            let left = ticket.substr(0, 10), right = ticket.substr(10);
            let leftRepeat = left.match(patternRepeat), rightRepeat = right.match(patternRepeat);
            if(leftRepeat && rightRepeat && leftRepeat[0][0] === rightRepeat[0][0]) {
                leftRepeat = leftRepeat[0];
                rightRepeat = rightRepeat[0];
                console.log(`ticket "${ticket}" - ${Math.min(rightRepeat.length, leftRepeat.length)}${rightRepeat[0]}${rightRepeat.length === 10 && leftRepeat.length === 10 ? ' Jackpot!': ''}`);
            } else {
                console.log(`ticket "${ticket}" - no match`);
            }
        } else {
            console.log('invalid ticket');
        }
    });
};
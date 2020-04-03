cardGame = (arr) => {
    let CARDS = { 'J': 11, 'Q': 12, 'K': 13, 'A': 14 },
        TYPES = { 'S': 4, 'H': 3, 'D': 2, 'C': 1 },
        decks = {};

    arr.forEach(el => {
        let [ name, cards ] = el.split(': ');
        cards = cards.split(', ');
        if(decks[name] != undefined) decks[name] = decks[name].concat(cards);
        else decks[name] = cards;
    });
    
    Object.entries(decks).forEach(([name, cards]) => {
        let POINTS = 0;
        new Set(cards).forEach(e => {
            let card = e.substr(0, e.length-1),
                type = e[e.length-1],
                cardPower = isNaN(card) ? CARDS[card] : Number(card),
                points = cardPower * TYPES[type];
            POINTS += points;
        });
        console.log(`${name}: ${POINTS}`);
    });
}

cardGame([
    'Peter: 2C, 4H, 9H, AS, QS',
    'Tomas: 3H, 10S, JC, KD, 5S, 10S',
    'Andrea: QH, QC, QS, QD',
    'Tomas: 6H, 7S, KC, KD, 5S, 10C',
    'Andrea: QH, QC, JS, JD, JC',
    'Peter: JD, JD, JD, JD, JD, JD'
    ]);
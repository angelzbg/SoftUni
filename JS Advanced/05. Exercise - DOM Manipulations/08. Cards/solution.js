solve = () => {
    const player1Cards = document.getElementById('player1Div').querySelectorAll('img');
    const player2Cards = document.getElementById('player2Div').querySelectorAll('img');
    const [spanRes1, vs, spanRes2] = document.querySelectorAll('#result span');
    const history = document.getElementById('history');

    let [selectedCard1, selectedCard2] = [null, null];

    const cardClick = (card, player) => {
        card.src = 'images/whiteCard.jpg';

        if (player) {
            selectedCard1 = card;
            spanRes1.textContent = card.name;
        } else {
            selectedCard2 = card;
            spanRes2.textContent = card.name;
        }

        if ((player && selectedCard2) || (!player && selectedCard1)) {
            const [value1, value2] = [+selectedCard1.name, +selectedCard2.name];
            if (value1 > value2) {
                selectedCard1.style = 'border: 2px solid green;';
                selectedCard2.style = 'border: 2px solid red;';
            } else if (value2 > value1) {
                selectedCard1.style = 'border: 2px solid red;';
                selectedCard2.style = 'border: 2px solid green;';
            }
            history.textContent += `[${spanRes1.textContent} ${vs.textContent} ${spanRes2.textContent}] `;
            [selectedCard1, selectedCard2, spanRes1.textContent, spanRes2.textContent] = [null, null, '', ''];
        }
    };

    [...player1Cards].forEach((card) => {
        card.addEventListener('click', () => cardClick(card, 1));
    });

    [...player2Cards].forEach((card) => {
        card.addEventListener('click', () => cardClick(card));
    });
};

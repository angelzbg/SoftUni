(function () {
    const Suits = {
        SPADES: '♠',
        HEARTS: '♥',
        DIAMONDS: '♦',
        CLUBS: '♣',
    };

    const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        get face() {
            return this.innerFace;
        }

        set face(face) {
            if (faces.indexOf(face) !== -1) {
                this.innerFace = face;
            } else {
                throw new Error();
            }
        }

        get suit() {
            return this.innerSuit;
        }

        set suit(suit) {
            if (Object.values(Suits).indexOf(suit) !== -1) {
                this.innerSuit = suit;
            } else {
                throw new Error();
            }
        }
    }

    return { Suits, Card };
})();

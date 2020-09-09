balloons = () => {
    class Balloon {
        constructor(color, gasWeight) {
            [this.color, this.gasWeight] = [color, gasWeight];
        }
    }

    class PartyBalloon extends Balloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength) {
            super(color, gasWeight);
            [this.ribbonColor, this.ribbonLength] = [ribbonColor, ribbonLength];
        }

        get ribbon() {
            return { color: this.ribbonColor, length: this.ribbonLength };
        }
    }

    class BirthdayBalloon extends PartyBalloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength, text) {
            super(color, gasWeight, ribbonColor, ribbonLength);
            this.balloonText = text;
        }

        get text() {
            return this.balloonText;
        }

        set text(text) {
            this.balloonText = text;
        }
    }

    return { Balloon, PartyBalloon, BirthdayBalloon };
};

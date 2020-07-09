gameOfEpicness = (kingdoms = [], battles = []) => {
    function General(name = '', army = 0) {
        this.addArmy = (army = 0) => {
            this.army += army;
        };

        this.score = (isWin) => {
            this.army = Math.floor(this.army * (isWin ? 1.1 : 0.9));
            isWin ? this.wins++ : this.losses++;
        };

        this.attack = (defender) => {
            if (this.army !== defender.army) {
                const isWin = this.army > defender.army;
                this.score(isWin);
                defender.score(!isWin);
            }
        };

        [this.name, this.army, this.wins, this.losses] = [name, 0, 0, 0];
        this.addArmy(army);
    }

    function Kingdom(name, general, army) {
        this.addGeneral = (general, army) => {
            if (!this.generals[general]) {
                this.generals[general] = new General(general, army);
            } else {
                this.generals[general].addArmy(army);
            }
        };

        this.getScore = () => {
            return Object.values(this.generals).reduce(
                (score, gen) => {
                    [score.wins, score.losses] = [score.wins + gen.wins, score.losses + gen.losses];
                    return score;
                },
                { wins: 0, losses: 0 },
            );
        };

        this.getGenerals = () => {
            return Object.values(this.generals)
                .sort((a, b) => b.army - a.army)
                .map(
                    (gen) =>
                        `/\\general: ${gen.name}\n---army: ${gen.army}\n---wins: ${gen.wins}\n---losses: ${gen.losses}`,
                )
                .join('\n');
        };

        [this.name, this.generals] = [name, {}];
        this.addGeneral(general, army);
    }

    function Battlefield() {
        this.addKingdom = ([kingdom, general, army]) => {
            if (this.kingdoms[kingdom]) {
                this.kingdoms[kingdom].addGeneral(general, army);
            } else {
                this.kingdoms[kingdom] = new Kingdom(kingdom, general, army);
            }
        };

        this.battle = ([atkKing, atkGen, defKing, defGen]) => {
            if (atkKing !== defKing) {
                const [attacker, defender] = [
                    this.kingdoms[atkKing].generals[atkGen],
                    this.kingdoms[defKing].generals[defGen],
                ];
                attacker.attack(defender);
            }
        };

        this.getWinner = () => {
            const winner = Object.values(this.kingdoms).sort((a, b) => {
                const [score1, score2] = [a.getScore(), b.getScore()];
                return score2.wins - score1.wins || score1.losses - score2.losses || a.name.localeCompare(b.name);
            })[0];
            return `Winner: ${winner.name}\n${winner.getGenerals()}`;
        };

        this.kingdoms = {};
    }

    const battlefield = new Battlefield();
    kingdoms.forEach((kingdom) => battlefield.addKingdom(Object.values(kingdom)));
    battles.forEach((battle) => battlefield.battle(battle));
    return battlefield.getWinner();
};

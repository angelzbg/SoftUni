heroes = () => {
    const Fighter = function (name = '') {
        [this.name, this.health, this.stamina] = [name, 100, 100];
        this.fight = () => {
            this.stamina -= 1;
            console.log(`${this.name} slashes at the foe!`);
        };
    };

    const Mage = function (name = '') {
        [this.name, this.health, this.mana] = [name, 100, 100];
        this.cast = (spell = '') => {
            this.mana -= 1;
            console.log(`${this.name} cast ${spell}`);
        };
    };

    return {
        mage: (name = '') => new Mage(name),
        fighter: (name = '') => new Fighter(name),
    };
};

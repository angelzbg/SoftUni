function Rat(name) {
    this.name = name;
    this.unitedRats = [];

    Object.defineProperties(this, {
        unite: {
            value: (rat) => {
                if (!(rat instanceof Rat)) {
                    return;
                }

                this.unitedRats.push(rat);
            },
        },
        getRats: {
            value: () => this.unitedRats,
        },
        toString: {
            value: () => `${this.name}${this.unitedRats.map((r) => `\n##${r.name}`).join('')}`,
        },
    });
}

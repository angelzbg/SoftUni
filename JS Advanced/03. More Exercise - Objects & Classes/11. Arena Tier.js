arenaTier = (input = []) => {
    function Gladiator(name = '', technique = '', skill = 0) {
        this.setTechnique = (technique = '', skill = 0) => {
            if(this.tech[technique] === undefined || this.tech[technique] < skill) {
                this.tech[technique] = skill;
            }
        };

        this.getTotalSkill = () => {
            return Object.values(this.tech).reduce((total, skill) => total + skill, 0);
        };

        [this.name, this.tech] = [name, {}];
        this.setTechnique(technique, skill);
    }

    function Tier() {
        this.addGladiator = (name = '', technique = '', skill = '') => {
            const gladiator = this.gladiators[name];
            if (!gladiator) {
                this.gladiators[name] = new Gladiator(name, technique, Number(skill));
            } else {
                gladiator.setTechnique(technique, Number(skill));
            }
        };

        this.battle = (gladiator1Name, gladiator2Name) => {
            const [gladiator1, gladiator2] = [this.gladiators[gladiator1Name], this.gladiators[gladiator2Name]];
            if (!gladiator1 || !gladiator2) {
                return;
            }

            const alltech = Object.keys(gladiator1.tech).concat(Object.keys(gladiator2.tech));
            if (alltech.length !== new Set(alltech).size) {
                const loser = gladiator1.getTotalSkill() > gladiator2.getTotalSkill() ? gladiator2.name : gladiator1.name;
                delete this.gladiators[loser];
            }
        };

        this.executeCommand = (cmd = '') => {
            cmd.includes('->') ? this.addGladiator(...cmd.split(' -> ')) : this.battle(...cmd.split(' vs '));
        };

        this.gladiatorsInfo = () => {
            return Object.values(this.gladiators)
                .sort((a, b) => b.getTotalSkill() - a.getTotalSkill() || a.name.localeCompare(b.name))
                .map((gladiator) => {
                    const tech = Object.entries(gladiator.tech)
                        .sort(([tech1, skill1], [tech2, skill2]) => skill2 - skill1 || tech1 - tech2)
                        .map(([technique, skill]) => `- ${technique} <!> ${skill}`)
                        .join('\n');
                    return `${gladiator.name}: ${gladiator.getTotalSkill()} skill\n${tech}`;
                })
                .join('\n');
        };

        this.gladiators = {};
    }

    const tier = new Tier();

    while ((cmd = input.shift()) !== 'Ave Cesar') {
        tier.executeCommand(cmd);
    }

    return tier.gladiatorsInfo();
};

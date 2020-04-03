arena = (arr) => {
    let arena = {};
    let totalPowers = {};
    
    let line = arr.shift();
    while(line !== 'Ave Cesar') {
        let split = line.split(' -> ');
        
        if(split.length === 3) { // gladiator
            let [ name, skill, power ] = split;
            power = Number(power);
            if(arena[name]) {
                if(arena[name][skill] !== undefined) {
                    if(arena[name][skill] < power) {
                        let diff = power - arena[name][skill];
                        arena[name][skill] = power;
                        totalPowers[name] += diff;
                    }
                } else {
                    arena[name][skill] = power;
                    totalPowers[name] += power;
                }
            } else {
                arena[name] = {};
                arena[name][skill] = power;
                totalPowers[name] = power;
            }
        } else { // battle
            let [ gladiator1, gladiator2 ] = line.split(' vs ');
            if(arena[gladiator1] && arena[gladiator2]) {
                let duel = false;
                for(let skillName in arena[gladiator1]) {
                    if(arena[gladiator2][skillName]) {
                        duel = true;
                        break;
                    }
                }
                if(duel) {
                    if(totalPowers[gladiator1] > totalPowers[gladiator2]) {
                        delete totalPowers[gladiator2];
                        delete arena[gladiator2];
                    } else {
                        delete totalPowers[gladiator1];
                        delete arena[gladiator1];
                    }
                }
            }
        }
        
        line = arr.shift();
    }

    Object
    .entries(totalPowers)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .forEach(([name, total]) => {
        console.log(`${name}: ${total} skill`);
        Object
        .entries(arena[name])
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .forEach(([skill, power]) => {
            console.log(`- ${skill} <!> ${power}`);
        })
    });
}

arena([
    'Peter -> BattleCry -> 400',
    'Alex -> PowerPunch -> 300',
    'Stefan -> Duck -> 200',
    'Stefan -> Tiger -> 250',
    'Ave Cesar'
    ]);

arena([
    'Pesho -> Duck -> 400',
    'Julius -> Shield -> 150',
    'Gladius -> Heal -> 200',
    'Gladius -> Support -> 250',
    'Gladius -> Shield -> 250',
    'Peter vs Gladius',
    'Gladius vs Julius',
    'Gladius vs Maximilian',
    'Ave Cesar'
    ]);
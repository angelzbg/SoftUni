battleManager = (input = []) => {
    let ppl = {};
    while((cmd = input.shift().split(':'))[0] !== 'Results') {
        if(cmd[0] === 'Add') {
            let [name, health, energy] = [cmd[1], ...cmd.splice(2).map(Number)];
            if(ppl[name]) {
                ppl[name].health += health;
            } else {
                ppl[name] = { health, energy };
            }
        } else if(cmd[0] === 'Attack') {
            let [attackerName, defenderName, damage] = [cmd[1], cmd[2], Number(cmd[3])];
            if(ppl[attackerName] && ppl[defenderName]) {
                if((ppl[defenderName].health -= damage) <= 0) {
                    delete ppl[defenderName];
                    console.log(`${defenderName} was disqualified!`);
                }
                if((ppl[attackerName].energy -= 1) === 0) {
                    delete ppl[attackerName];
                    console.log(`${attackerName} was disqualified!`);
                }
            }
        } else { // 'Delete'
            if(cmd[1] === 'All') {
                ppl = {};
            } else {
                delete ppl[cmd[1]];
            }
        }
    }

    console.log(`People count: ${Object.keys(ppl).length}`);

    Object
        .entries(ppl)
        .sort((a, b) => b[1].health - a[1].health || a[0].localeCompare(b[0]))
        .forEach(([name, stats]) => {
            console.log(`${name} - ${stats.health} - ${stats.energy}`);
        });
};


battleManager([
    'Add:Bonnie:3000:5',
    'Add:Johny:4000:10',
    'Delete:All',
    'Add:Bonnie:3333:3',
    'Results'
  ]);

armies = (arr) => {
    // Tuk stana high level bez da iskam xD
    let leaders = {}, armies = {};

    arr.forEach(line => {
        let format = line.includes('arrives') ? 1 : 
                    line.includes(':') ? 2 :
                    line.includes('+') ? 3 : 4;

        if(format === 1) { // Add the leader (no army)
            let leader = line.split(' arrives')[0];
            leaders[leader] = {
                count: 0,
                armies: {}
            };
        } else if(format === 2) { // Add army and count to leader (if exists)
            let parts = line.split(': ');
            let leader = parts.shift();

            if(leaders[leader]) {
                let [ armyName, count ] = parts.shift().split(', ');
                count = Number(count);
                armies[armyName] = { count, leader };
                leaders[leader].count += count;
                leaders[leader].armies[armyName] = armies[armyName];
            }
        } else if(format === 3) { // If the army exists somewhere add the count
            let [armyName, count] = line.split(' + ');
            count = Number(count);

            if(armies[armyName]) {
                armies[armyName].count += count;
                leaders[armies[armyName].leader].count += count;
            }
        } else { // 4 - delete the leader and his army (if he exists)
            let leader = line.split(' defeated')[0];
            
            if(leaders[leader]) {
                for(armyName in leaders[leader].armies) {
                    delete armies[armyName];
                }

                delete leaders[leader];
            }
        }
    });

    Object.entries(leaders)
    .sort((a, b) => b[1].count - a[1].count)
    .forEach(([key, value]) => {
        console.log(`${key}: ${value.count}`);

        Object.entries(value.armies)
        .sort((a, b) => b[1].count - a[1].count)
        .forEach(([armyName, army]) => {
            console.log(`>>> ${armyName} - ${army.count}`);
        });
    });

};
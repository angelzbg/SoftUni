netherRealms = ([line]) => {
    // Functions
    const sumArray = (arr) => arr.reduce((a, b) => a + b, 0);

    // RegEx
    const patterns = {
        name: /[^ ,]+/g,
        health: /[^0-9\+\-\*\,\/\.]/g,
        numbers: /[\+-]?[\d]+(\.[\d]+)?/g,
        operators: /[*\/]/g
    };

    // Collections
    const demons = {};

    // Algorithm
    while( (result = patterns.name.exec(line)) !== null ) {
        let demonName = result[0];

        let healthChars = demonName.match(patterns.health);
        let health = healthChars === null ? 0 : sumArray(healthChars.map(ch => ch.charCodeAt(0)));
        
        let numbers = demonName.match(patterns.numbers);
        let damage = numbers === null ? 0 : sumArray(numbers.map(Number));
        let operators = demonName.match(patterns.operators);
        if(operators !== null && damage !== 0) {
            operators.forEach(o => {
                if(o === '*') damage *= 2;
                else damage /= 2;
            });
        }
        
        demons[demonName] = { health, damage };
    }

    // Output
    Object.keys(demons).sort().forEach(name => {
        let demon = demons[name];
        console.log(`${name} - ${demon.health} health, ${demon.damage.toFixed(2)} damage`);
    });
    
} // netherRealms [  END  ]

netherRealms([ 'M3ph-0.5s-0.5t0.0**' ]);
netherRealms([ 'M3ph1st0**, Azazel' ]);
netherRealms([ 'Gos/ho' ]);
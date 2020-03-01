(input) => {
    let chefs = Number(input.shift());
    let max = Number.MIN_SAFE_INTEGER, maxName = '';
    for(let i=0; i<chefs; i++) {
        let name = input.shift();
        let line = input.shift();
        let points = 0;
        while(line !== 'Stop') {
            points += Number(line);
            line = input.shift();
        }
        console.log(`${name} has ${points} points.`);
        if(max < points) {
            max = points;
            maxName = name;
            console.log(`${name} is the new number 1!`);
        }
    }

    console.log(`${maxName} won competition with ${max} points! `);
}
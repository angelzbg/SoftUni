race = (input) => {
    let racersNames = new Set(input.shift().split(', '));
    let racers = {};

    let patternName = /[A-Za-z]/g, patternDistance = /[0-9]/g;

    while( (line = input.shift()) !== 'end of race' ) {
        let name = line.match(patternName).join('');
        let distance = line.match(patternDistance).map(Number).reduce((a, b) => a + b, 0);
        if(racersNames.has(name)) {
            racers[name] = distance + (racers[name] || 0);
        }
    }

    let sortedRacers = Object.keys(racers).sort((a, b) => racers[b] - racers[a]);
    console.log(`1st place: ${sortedRacers[0]}`);
    console.log(`2nd place: ${sortedRacers[1]}`);
    console.log(`3rd place: ${sortedRacers[2]}`);
}
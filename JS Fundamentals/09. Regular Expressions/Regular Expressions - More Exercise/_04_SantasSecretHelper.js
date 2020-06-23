santasHelper = (input = []) => {
    let goodKids = new Set();
    let key = Number(input.shift());
    let pattern = /@(?<name>[A-Za-z]+)[^@!:>-]*!(?<behavior>G)!/;

    while( (line = input.shift()) !== 'end' ) {
        line = line.split('').map(ch => String.fromCharCode(ch.charCodeAt(0) - key)).join('');
        let result = line.match(pattern);

        if(result) {
            goodKids.add(result.groups.name);
        }
    }
    
    console.log([...goodKids].join('\n'));
};
starEnigma = (input) => {
    let attacked = [], destroyed = [];
    let patternLetters = /[starSTAR]/g;
    let validPattern = /@(?<name>[a-zA-Z]+)(?:[^@\-!:]+)?:(?<population>\d+)(?:[^@\-!:]+)?!(?<type>[AD])!(?:[^@\-!:]+)?->(?<soldiers>\d+)/;

    let count = Number(input.shift());
    for(let i = 0; i < count; i++) {
        let line = input.shift();
        let ruleCount = line.match(patternLetters);
        if(ruleCount) {
            ruleCount = ruleCount.length;
            let decrypt1 = '';
            for(let j = 0; j < line.length; j++) {
                decrypt1 += String.fromCharCode(line.charCodeAt(j) - ruleCount);
            }
            line = decrypt1;
        }
        let result = line.match(validPattern);
        if(result) {
            let groups = result.groups;
            if(groups.type === 'A') {
                attacked.push(groups.name);
            } else {
                destroyed.push(groups.name);
            }
        }
    }

    console.log(`Attacked planets: ${attacked.length}`);
    attacked.sort().forEach(p => console.log(`-> ${p}`));
    console.log(`Destroyed planets: ${destroyed.length}`);
    destroyed.sort().forEach(p => console.log(`-> ${p}`));
};
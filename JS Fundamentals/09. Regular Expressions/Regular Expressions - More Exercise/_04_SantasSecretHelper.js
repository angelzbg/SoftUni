santasHelper = (input) => {
    let goodKids = new Set();
    let key = Number(input.shift());
    let pattern = /@(?<name>[A-Za-z]+)[^@!:>-]*!(?<behavior>G)!/;
    while( (line = input.shift()) !== 'end' ) {
        line = line.split('').map(ch => String.fromCharCode(ch.charCodeAt(0) - key)).join('');
        let result = line.match(pattern);
        if(result !== null) {
            goodKids.add(result.groups.name);
        }
    }
    console.log([...goodKids].join('\n'));
}

santasHelper([
    '4',
    '~lwzjkl~jenlymfDFsffmiCwozwlzjln%K%',
    '0zfjrl}xnrlDWeqqmi/wnznlwzjnn%K%onhfhnf',
    ';:<lyiljz{onzDPere=;=9<;8=rhknlf%K%',
    "Wonvfkmwzkmpwvzkm'lhjnlDWeqerxle0wlnzj{nz%K%nohwn",
    'DReh}e=<4lhzj1%K%',
    'end'
  ]);
ages = (age = 1) => {
    let output = '';
    if (age < 0) output = 'out of bounds';
    else if (age < 3) output = 'baby';
    else if (age < 14) output = 'child';
    else if (age < 20) output = 'teenager';
    else if (age < 66) output = 'adult';
    else output = 'elder';

    console.log(output);
};

agesAdvanced = (age = 1) => {
    for ([phase, ageReq] of Object.entries({ elder: 66, adult: 20, teenager: 14, child: 3, baby: 0 })) {
        if (age >= ageReq) {
            return console.log(phase);
        }
    }

    console.log('out of bounds');
};

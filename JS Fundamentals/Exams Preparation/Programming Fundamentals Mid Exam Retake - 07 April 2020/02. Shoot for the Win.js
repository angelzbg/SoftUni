shootForTheWin = (input) => {
    let targets = input.shift().split(' ').map(Number);
    for(let i of input.map(Number)) {
        if(isNaN(i)) { // obv 'End'
            break;
        }

        if((value = targets[i]) !== undefined && value !== -1) {
            targets[i] = -1;
            targets.forEach((target, index) => {
                if(target !== -1) {
                    if(target > value) {
                        targets[index] -= value;
                    } else {
                        targets[index] += value;
                    }
                }
            });
        }
    }

    const shotTargets = targets.filter(t => t === -1).length;
    console.log(`Shot targets: ${shotTargets} -> ${targets.join(' ')}`);
};

shootForTheWin([ '24 50 36 70', '0', '4', '3', '1', 'End' ]);
shootForTheWin([ '30 30 12 60 54 66', '5', '2', '4', '0', 'End' ]);
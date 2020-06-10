gladiatorInventory = (input) => {
    let inventory = input.shift().split(' ');
    input.forEach(line => {
        let [ cmd, args ] = line.split(' ');
        if(cmd === 'Buy') {
            if(inventory.indexOf(args) === -1) {
                inventory.push(args);
            }
        } else if(cmd === 'Trash') {
            if((index = inventory.indexOf(args)) > -1) {
                inventory.splice(index, 1);
            }
        } else if(cmd === 'Repair') {
            if((index = inventory.indexOf(args)) > -1) {
                inventory.push(inventory.splice(index, 1));
            }
        } else { // 'Upgrade'
            let [ equipment, upgrade ] = args.split('-');
            if((index = inventory.indexOf(equipment)) > -1) {
                inventory.splice(index+1, 0, `${equipment}:${upgrade}`);
            }
        }
    });
    console.log(inventory.join(' '));
};
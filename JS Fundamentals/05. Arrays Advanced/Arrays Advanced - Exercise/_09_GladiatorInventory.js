gladiatorInventory = (input) => {
    let inventory = input.shift().split(' ');
    input.forEach(line => {
        let [ cmd, args ] = line.split(' ');
        if(cmd === 'Buy') {
            if(inventory.indexOf(args) === -1) {
                inventory.push(args);
            }
        } else if(cmd === 'Trash') {
            let index = inventory.indexOf(args);
            if(index > -1) inventory.splice(index, 1);
        } else if(cmd === 'Repair') {
            let index = inventory.indexOf(args);
            if(index > -1) {
                inventory.push(inventory.splice(index, 1));
            }
        } else { // 'Upgrade'
            let [ equipment, upgrade ] = args.split('-');
            let index = inventory.indexOf(equipment);
            if(index > -1) {
                inventory.splice(index+1, 0, `${equipment}:${upgrade}`);
            }
        }
    });
    console.log(inventory.join(' '));
}
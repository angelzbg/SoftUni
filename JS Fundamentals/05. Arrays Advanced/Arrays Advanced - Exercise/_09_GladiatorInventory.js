(input) => {
    // Porednata piqna zadacha ot softuni
    let inventory = input.shift().split(' ');
    input.forEach(line => {
        let [ cmd, args ] = line.split(' ');
        if(cmd === 'Buy' && inventory.indexOf(args) === -1) {
            inventory.push(args);
        } else if(cmd === 'Trash') {
            let index = inventory.indexOf(args);
            if(index > -1) inventory.splice(index, 1);
        } else if(cmd === 'Repair') {
            let index = inventory.indexOf(args);
            if(index > -1) {
                inventory.splice(index, 1);
                inventory.push(args);
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
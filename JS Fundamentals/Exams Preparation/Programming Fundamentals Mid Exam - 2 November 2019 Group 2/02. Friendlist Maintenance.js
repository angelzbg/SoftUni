friendlistMaintenance = (input = []) => {
    const list = input.shift().split(', ');

    while((cmd = input.shift().split(' '))[0] !== 'Report') {
        if(cmd[0] === 'Blacklist') {
            let index = list.indexOf(cmd[1]);
            if(index !== -1) {
                list[index] = 'Blacklisted';
                console.log(`${cmd[1]} was blacklisted.`);
            } else {
                console.log(`${cmd[1]} was not found.`);
            }
        } else if(cmd[0] === 'Error') {
            let index = cmd[1];
            let name = list[index];
            if(name !== 'Blacklisted' && name !== 'Lost') {
                list[index] = 'Lost';
                console.log(`${name} was lost due to an error.`);
            }
        } else { // 'Change'
            let [index, newName] = cmd.slice(1);
            if(list[index]) {
                console.log(`${list[index]} changed his username to ${newName}.`);
                list[index] = newName;
            }
        }
    }

    console.log(`Blacklisted names: ${list.filter(x => x === 'Blacklisted').length}`);
    console.log(`Lost names: ${list.filter(x => x === 'Lost').length}`);
    console.log(list.join(' '));
};

friendlistMaintenance([
    'Mike, John, Eddie',
    'Blacklist Mike',
    'Error 0',
    'Error 1',
    'Change 2 Mike123',
    'Report'
  ]);
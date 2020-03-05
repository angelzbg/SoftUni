(input) => {
    let guests = [];
    while(input.length > 0) {
        let cmd = input.shift().split(' ');
        let index = guests.indexOf(cmd[0]);
        if(cmd[2] === 'going!') {
            if(index !== -1) console.log(`${cmd[0]} is already in the list!`);
            else guests.push(cmd[0]);
        } else { // not
            if(index === -1) console.log(`${cmd[0]} is not in the list!`);
            else guests.splice(index, 0);
        }
    }

    console.log(guests.join('\n'));
}
(input) => {
    let list = input.shift().split(' ');
    let line = input.shift();
    while(line !== 'Play!') {
        line = line.split();
        let cmd = line[0], game = line[1];

        if(cmd === 'Install') {
            if(list.indexOf(game) === -1) list.push(game);
        } else if(cmd === 'Uninstall') {
            let index = list.indexOf(game);
            if(index !== -1) list.splice(index, 1);
        } else if(cmd === 'Update') {

        } else { // 'Expansion'

        }


        line = input.shift();
    }
}
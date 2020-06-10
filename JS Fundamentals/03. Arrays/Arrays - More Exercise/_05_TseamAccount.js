tseamAccount = (input) => {
    let list = input.shift().split(' ');
    while(([cmd, game] = input.shift().split(' '))[0] !== 'Play!' ) {
        if(cmd === 'Install') {
            if(list.indexOf(game) === -1) {
                list.push(game);
            }
        } else if(cmd === 'Uninstall') {
            if((index = list.indexOf(game)) !== -1) {
                list.splice(index, 1);
            }
        } else if(cmd === 'Update') {
            if((index = list.indexOf(game)) !== -1) {
                list.splice(index, 1);
                list.push(game);
            }
        } else if((index = list.indexOf(([main, expansion] = game.split('-'))[0])) !== -1) { // 'Expansion'
            list.splice(index + 1, 0, `${list[index]}:${expansion}`);
        }
    }
    
    console.log(list.join(' '));
};
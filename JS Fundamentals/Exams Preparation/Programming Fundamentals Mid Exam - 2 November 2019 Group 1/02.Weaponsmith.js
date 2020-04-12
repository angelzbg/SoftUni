weaponsmith = (input) => {
    let forge = input.shift().split('|');
    while((cmd = input.shift().split(' '))[0] !== 'Done') {
        if(cmd[0] === 'Move') {
            let index = Number(cmd[2]);
            if(cmd[1] === 'Right') {
                if(index > -1 && index < forge.length - 1) {
                    forge.splice(index + 1, 0, forge.splice(index, 1));
                }
            } else { // 'Left'
                if(index > 0 && index < forge.length) {
                    forge.splice(index - 1, 0, forge.splice(index, 1));
                }
            }
        } else if(cmd[0] === 'Check') {
            if(cmd[1] === 'Odd') {
                console.log(forge.filter((el, i) => i % 2 === 1).join(' '));
            } else { // 'Even'
                console.log(forge.filter((el, i) => i % 2 === 0).join(' '));
            }
        }
    }
    console.log(`You crafted ${forge.join('')}!`);
}

weaponsmith([
    'ri|As|er|hb|ng',
    'Move Left 1',
    'Move Right 2',
    'Move Right 3',
    'Move Left 2',
    'Done'
  ]);
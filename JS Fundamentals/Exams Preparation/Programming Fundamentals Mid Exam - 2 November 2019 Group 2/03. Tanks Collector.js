tankCollector = (input = []) => {
    let tanks = input.shift().split(', ');  
    let cmds = Number(input.shift());

    for(let i = 0; i < cmds; i++) {
        let cmd = input.shift().split(', ');

        if(cmd[0] === 'Add') {
            if(tanks.indexOf(cmd[1]) !== -1) {
                console.log('Tank is already bought');
            } else {
                tanks.push(cmd[1]);
                console.log(`Tank successfully bought`);
            }
        } else if(cmd[0] === 'Remove') {
            let index = tanks.indexOf(cmd[1]);
            if(index !== -1) {
                tanks.splice(index, 1);
                console.log('Tank successfully sold');
            } else {
                console.log('Tank not found');
            }
        } else if(cmd[0] === 'Remove At') {
            let index = Number(cmd[1]);
            if(tanks[cmd[1]]) {
                tanks.splice(index, 1);
                console.log('Tank successfully sold');
            } else {
                console.log('Index out of range');
            }
        } else if(cmd[0] === 'Insert') {
            let index = Number(cmd[1]), name = cmd[2];
            if(!tanks[index]) {
                console.log('Index out of range');
                continue;
            }

            let foundIndex = tanks.indexOf(name);
            if(foundIndex !== -1) {
                console.log('Tank is already bought');
                continue;
            }

            tanks.splice(index, 0, name);
            console.log('Tank successfully bought');
        }
    }

    console.log(tanks.join(', '));
};

tankCollector([
    'T-34-85 Rudy, SU-100Y, STG',
    '3',
    'Add, King Tiger(C)',
    'Insert, 2, IS-2M',
    'Remove, T-34-85 Rudy'
  ]);
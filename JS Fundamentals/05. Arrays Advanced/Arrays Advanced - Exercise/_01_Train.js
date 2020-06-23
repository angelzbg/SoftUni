train = (input = []) => {
    let wagons = input.shift().split(' ').map(Number),
        capacity = Number(input.shift());

    while(input.length > 0) {
        let cmd = input.shift().split(' ');
        if(cmd[0] === 'Add') {
            wagons.push(Number(cmd[1]));
        } else {
            let passangers = Number(cmd[0]);
            
            for(let i = 0; i < wagons.length; i++) {
                if(wagons[i] + passangers <= capacity) {
                    wagons[i] += passangers;
                    break;
                }
            }
        }
    }

    console.log(wagons.join(' '));
};
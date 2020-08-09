taskOne = (input = []) => {
    let string = input.shift();

    while ((cmd = input.shift().split(':'))[0] !== 'Travel') {
        if (cmd[0] === 'Add Stop') {
            const index = +cmd[1];
            if (string[index]) {
                string = string.substring(0, index) + cmd[2] + string.substring(index);
            }
        } else if (cmd[0] === 'Remove Stop') {
            const [start, end] = cmd.slice(1).map(Number);
            if (string[start] && string[end]) {
                string = string.substring(0, start) + string.substring(end + 1);
            }
        } else {
            // 'Switch'
            string = string.replace(new RegExp(cmd[1], 'g'), cmd[2]);
        }
        console.log(string);
    }

    console.log(`Ready for world tour! Planned stops: ${string}`);
};

taskOne(['Hawai::Cyprys-Greece', 'Add Stop:7:Rome', 'Remove Stop:11:16', 'Switch:Hawai:Bulgaria', 'Travel']);

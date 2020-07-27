activationKeys = (input = []) => {
    let key = input.shift();
    while ((cmd = input.shift().split('>>>'))[0] !== 'Generate') {
        if (cmd[0] === 'Contains') {
            console.log(key.includes(cmd[1]) ? `${key} contains ${cmd[1]}` : 'Substring not found!');
        } else if (cmd[0] === 'Flip') {
            const [startIndex, endIndex] = cmd.splice(2, 2).map(Number);
            const substring = key.substring(startIndex, endIndex);
            key = `${key.substring(0, startIndex)}${substring[`to${cmd[1]}Case`]()}${key.substring(endIndex)}`;
            console.log(key);
        } else {
            // 'Slice'
            const [startIndex, endIndex] = cmd.splice(1, 2).map(Number);
            key = `${key.substring(0, startIndex)}${key.substring(endIndex)}`;
            console.log(key);
        }
    }

    console.log(`Your activation key is: ${key}`);
};

activationKeys([
    'abcdefghijklmnopqrstuvwxyz',
    'Slice>>>2>>>6',
    'Flip>>>Upper>>>3>>>14',
    'Flip>>>Lower>>>5>>>7',
    'Contains>>>def',
    'Contains>>>deF',
    'Generate',
]);

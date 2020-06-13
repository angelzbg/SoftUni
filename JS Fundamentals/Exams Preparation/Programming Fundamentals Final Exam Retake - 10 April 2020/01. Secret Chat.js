secretChat = (input) => {
    let message = input.shift();
    while((cmd = input.shift().split(':|:'))[0] !== 'Reveal') {
        if(cmd[0] === 'InsertSpace') {
            const index = Number(cmd[1]);
            message = message.substring(0, index) + ' ' + message.substring(index);
            console.log(message);
        } else if(cmd[0] === 'Reverse') {
            const substring = cmd[1];
            const startIndex = message.indexOf(substring);
            if(startIndex !== -1) {
                const endIndex = startIndex + substring.length;
                // message.split(substring).join('') + substring.split('').reverse().join('')
                message = message.substring(0, startIndex) + message.substring(endIndex) + substring.split('').reverse().join('');
                console.log(message);
            } else {
                console.log('error');
            }
        } else { // 'ChangeAll'
            const [ substring, replacement ] = cmd.slice(1);
            message = message.replace(new RegExp(substring, 'g'), replacement);
            console.log(message);
        }
    }

    console.log(`You have a new text message: ${message}`);
};

secretChat([
    'heVVodar!gniV',
    'ChangeAll:|:V:|:l',
    'Reverse:|:!gnil',
    'InsertSpace:|:5',
    'Reveal'
  ]);

secretChat([
    'Hiware?uiy',
    'ChangeAll:|:i:|:o',
    'Reverse:|:?uoy',
    'Reverse:|:jd',
    'InsertSpace:|:3',
    'InsertSpace:|:7',
    'Reveal'
  ]);
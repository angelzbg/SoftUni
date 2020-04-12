inboxManager = (input) => {
    let users = {};
    while((cmd = input.shift().split('->'))[0] !== 'Statistics') {
        if(cmd[0] === 'Add') {
            if(users[cmd[1]]) {
                console.log(`${cmd[1]} is already registered`);
            } else {
                users[cmd[1]] = [];
            }
        } else if(cmd[0] === 'Send') {
            users[cmd[1]].push(cmd[2]);
        } else { // 'Delete'
            if(!users[cmd[1]]) {
                console.log(`${cmd[1]} not found!`);
            } else {
                delete users[cmd[1]];
            }
        }
    }
    console.log(`Users count: ${Object.keys(users).length}`);
    Object.entries(users)
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .forEach(([username, emails]) => {
        console.log(username);
        emails.forEach(email => console.log(` - ${email}`));
    });
}

inboxManager([
    'Add->Mike',
    'Add->George',
    'Send->George->Hello World',
    'Send->George->Some random test mail',
    'Send->Mike->Hello, do you want to meet up tomorrow?',
    'Send->George->It would be a pleasure',
    'Send->Mike->Another random test mail',
    'Statistics'
  ]);
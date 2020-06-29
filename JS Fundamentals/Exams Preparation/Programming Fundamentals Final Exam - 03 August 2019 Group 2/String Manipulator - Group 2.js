stringManipulator = ([string = '', ...cmds]) => {
    const print = () => console.log(string);

    while((cmd = cmds.shift().split(' '))[0] !== 'Done') {
        if(cmd[0] === 'Change') {
            string = string.replace(new RegExp(`${cmd[1]}`, 'g'), cmd[2]);
            print();
        } else if(cmd[0] === 'Includes') {
            console.log(string.includes(cmd[1]) ? 'True' : 'False');
        } else if(cmd[0] === 'End') {
            console.log(string.endsWith(cmd[1]) ? 'True' : 'False');
        } else if(cmd[0] === 'Uppercase') {
            string = string.toUpperCase();
            print();
        } else if(cmd[0] === 'FindIndex') {
            console.log(string.indexOf(cmd[1]));
        } else { // 'Cut'
            string = string.substr(...cmd.splice(1).map(Number));
            print();
        }
    }
};

stringManipulator([
    '//Th1s 1s my str1ng!//',
    'Change 1 i',
    'Includes string',
    'End my',
    'Uppercase',
    'FindIndex I',
    'Cut 5 5',
    'Done'
  ]);
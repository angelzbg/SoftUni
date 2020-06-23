arrayManipulator = (input = []) => {
    let arr = input.shift().split(' ').map(Number);
    while(input.length > 0) {
        let cmd = input.shift().split(' ');
        
        if(cmd[0] === 'Add') {
            arr.push(Number(cmd[1]));
        } else if(cmd[0] === 'Remove') {
            let num = Number(cmd[1]);
            arr = arr.filter( el => el !== num);
        } else if(cmd[0] === 'RemoveAt') {
            arr.splice(Number(cmd[1]), 1);
        } else { // Insert
            arr.splice(Number(cmd[2]), 0, Number(cmd[1]));
        }
    }

    console.log(arr.join(' '));
};
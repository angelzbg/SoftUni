(input) => {
    let eggs = +input.shift(), cmd = input.shift(), bought = 0;
    while(cmd !== 'Close') {
        let count = +input.shift();
        if(cmd === 'Buy') {
            if(count > eggs) {
                console.log(`Not enough eggs in store!\nYou can buy only ${eggs}.`);
                return;
            }
            bought += count;
            eggs -= count;
        } else {
            eggs += count;
        }
        cmd = input.shift();
    }
    console.log(`Store is closed!\n${bought} eggs sold.`);
}
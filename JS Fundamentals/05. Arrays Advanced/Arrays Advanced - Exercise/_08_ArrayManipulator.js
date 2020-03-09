(nums, cmds) => {
    // Zadachata e napulno vqrna, picha s testovete e bil piqn.
    let cmd = cmds.shift().split(' ');
    while(cmd[0] !== 'print') {
        if(cmd[0] === 'add') {
            nums.splice(Number(cmd[1]), 0, Number(cmd[2]));
        } else if(cmd[0] === 'addMany') {
            let index = Number(cmd[1]);
            nums.splice(index, 0, ...cmd.slice(2).map(Number));
        } else if(cmd[0] === 'contains') {
            console.log(nums.indexOf(Number(cmd[1])));
        } else if(cmd[0] === 'remove') {
            nums.splice(Number(cmd[1]), 1);
        } else if(cmd[0] === 'shift') {
            let copy = nums.splice(0, Number(cmd[1]));
            nums = nums.concat(copy);
        } else { // 'sumPairs'
            let summed = [], len = nums.length;
            for(let i=0; i<len; i+=2) summed.push(nums[i] + (nums[i+1] || 0));
            nums = summed;
        }
        cmd = cmds.shift().split(' ');
    }
    console.log('[ ' + nums.join(', ') + ' ]');
}
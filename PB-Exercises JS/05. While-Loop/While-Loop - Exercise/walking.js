(input) => {
    const n = input.length;
    let line = '', total = 0;
    for(let i=0; i<n; i++) {
        line = input.shift();
        if(line === 'Going home') {
            total+=Number(input.shift());
            break;
        }
        total+=Number(line);
    }

    console.log(total >= 10000 ? 'Goal reached! Good job!' : `${10000-total} more steps to reach goal.`);
}
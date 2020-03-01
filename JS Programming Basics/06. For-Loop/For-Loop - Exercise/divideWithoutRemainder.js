(input) => {
    let counts = [0, 0, 0];
    const len = input.length-1;
    for(let i=1; i<=len; i++) {
        if(input[i] % 2 == 0) counts[0]++;
        if(input[i] % 3 == 0) counts[1]++;
        if(input[i] % 4 == 0) counts[2]++;
    }
    for(let i=0; i<3; i++) {
        counts[i] = (100/len*counts[i]).toFixed(2) + '%';
    }
    console.log(counts.join('\n'));
}
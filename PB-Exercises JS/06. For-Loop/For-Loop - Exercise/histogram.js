(input) => {
    let counts = [0, 0, 0, 0, 0], num = 0;
    input.slice(1).forEach(e => {
        num = Number(e);
        if(num < 200) counts[0]++;
        else if(num < 400) counts[1]++;
        else if(num < 600) counts[2]++;
        else if(num < 800) counts[3]++;
        else counts[4]++;
    });
    const len = input.length-1;
    for(let i=0; i<5; i++) {
        counts[i] = (100/len*counts[i]).toFixed(2) + '%';
    }
    console.log(counts.join('\n'));
}
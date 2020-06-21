NxNMatrix = (N) => {
    for(let i = 0; i < N; i++) {
        console.log(`${N} `.repeat(N));
    }
};

NxNMatrix = (N) => {
    new Array(N).fill(new Array(N).fill(N)).forEach(row => console.log(row.join(' ')));
};
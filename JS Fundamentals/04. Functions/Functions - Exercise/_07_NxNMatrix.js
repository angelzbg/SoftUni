NxNMatrix = (N = 1) => {
    for(let i = 0; i < N; i++) {
        console.log(`${N} `.repeat(N));
    }
};

NxNMatrix = (N = 1) => {
    new Array(N).fill(new Array(N).fill(N)).forEach(row => console.log(row.join(' ')));
};
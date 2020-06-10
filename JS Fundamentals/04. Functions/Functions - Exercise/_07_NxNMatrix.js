NxNMatrix = (N) => {
    let row = '';

    for(let i = 0; i < N; i++) {
        row += `${N} `;
    }
    
    for(let i = 0; i < N; i++) {
        console.log(row);
    }
};
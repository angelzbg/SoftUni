NxNMatrix = (N) => {
    /* If we need the matrix
    let matrix = [];
    for(let i=0; i<N; i++) {
        let row = [];
        for(let j=0; j<N; j++) {
            row.push(N);
        }
        matrix.push(row);
    }
    matrix.forEach(row => console.log(row.join(' ')));
    //*/
    // If we don't need the matrix;
    let row = '';
    for(let i=0; i<N; i++) {
        row += `${N} `;
    }
    for(let i=0; i<N; i++) {
        console.log(row);
    }
}
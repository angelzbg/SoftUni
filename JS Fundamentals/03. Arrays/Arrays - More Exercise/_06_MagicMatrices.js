(M) => {
    let isMagicMatrix = (m) => {
        let rows = m.length,
            cows = m[0].length,
            sum = m[0].reduce((a, b) => a + b, 0);
        
        for(let i=1; i<rows; i++) {
            if(m[i].reduce((a, b) => a + b, 0) !== sum) return false;
        }

        for(let i=0; i<cows; i++) {
            let vertSum = 0;
            for(let j=0; j<rows; j++) {
                vertSum += m[j][i];
            }
            if(vertSum !== sum) return false;
        }

        return true;
    }

    console.log(isMagicMatrix(M));
}
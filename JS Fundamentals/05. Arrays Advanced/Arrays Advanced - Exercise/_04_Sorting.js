sorting = (arr) => {
    let ascending = arr.sort( (a, b) => { return a - b; } );
    let descending = ascending.slice(0).reverse();
    let result = [];
    let half = Math.ceil(ascending.length / 2);

    for(let i = 0; i < half; i++) {
        result.push(descending[i]);
        
        if(descending[i] === ascending[i]) {
            break;
        }

        result.push(ascending[i]);
    }

    console.log('\n' + result.join(' '));
};
(arr) => {
    let sorted = arr.sort( (a, b) => { return a - b; } );
    console.log(sorted.slice(0, 2).join(' '));
}
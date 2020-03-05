(arr) => {
    let reversed = [];
    arr.forEach( (num, i) => {
        if(i%2===1) reversed.splice(0, 0, num*2);
    });
    console.log(reversed.join(' '));
}
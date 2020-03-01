(input) => {
    const n = Number(input.shift());
    let min = Number(input.shift());
    for(let i=1; i<n; i++) { // 1 broika po-malko shtoto veshe shiftnah
        let num = Number(input.shift());
        if(num < min) min = num;
    }
    console.log(min);
}
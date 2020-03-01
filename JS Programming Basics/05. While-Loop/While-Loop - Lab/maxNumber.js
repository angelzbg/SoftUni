(input) => {
    const n = Number(input.shift());
    let max = Number(input.shift());
    for(let i=1; i<n; i++) { // 1 broika po-malko shtoto veshe shiftnah
        let num = Number(input.shift());
        if(num > max) max = num;
    }
    console.log(max);
}
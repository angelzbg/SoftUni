() => {
    let output = '7\n';
    for(let i=17; i<998; i++) {
        if(i % 10 == 7) output += i+'\n';
    }
    console.log(output);
}
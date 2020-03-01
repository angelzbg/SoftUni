(input) => {
    const num = Number(input.shift());
    let output = '';
    for(let i=num; i>0; i--) output+=i+'\n';
    console.log(output);
}
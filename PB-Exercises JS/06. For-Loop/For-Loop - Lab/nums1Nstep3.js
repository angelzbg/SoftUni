(input) => {
    const num = Number(input.shift())+1;
    let output = '';
    for(let i=1; i<num; i+=3) output+=i+'\n';
    console.log(output);
}
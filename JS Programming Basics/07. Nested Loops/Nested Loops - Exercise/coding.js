(input) => {
    const line = input.shift();

    for(let i=line.length; i>-1; i--) {
        const num = Number(line[i]);
        if(num == 0) {
            console.log('ZERO');
            continue;
        }

        let output = '';
        let symbol = String.fromCharCode(num+33);
        for(let i=0; i<num; i++) output+=symbol;
        console.log(output);
    }
}
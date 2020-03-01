function solve(input){
    let n = Number(input.shift());
    let times=1, counter = 2, output = '1\n';
    
    while(counter <= n) {
        let end = counter+times;
        for(let i=counter; i <= (end < n ? end : n); i++) {
            output += i + ' ';
        }
        output+='\n';
        counter+=1+times++;
    }

    console.log(output);
    
}

solve(['12']);
solve(['15']);
solve(['7']);
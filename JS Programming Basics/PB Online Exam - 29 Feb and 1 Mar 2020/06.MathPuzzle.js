(input) => {
    let key = Number(input.shift()), output = '';

    for(let a=1; a<=30; a++) {
        for(let b=1; b<=30; b++) {
            for(let c=1; c<=30; c++) {
                let sum = a + b + c;
                let prod = a * b * c;
                if(sum === key) {
                    if(a < b && b < c) output += `${a} + ${b} + ${c} = ${key}\n`;
                } else if(prod === key) {
                    if(a > b && b > c) output += `${a} * ${b} * ${c} = ${key}\n`;
                }
            }
        }
    }

    console.log(output.length === 0 ? 'No!' : output);
}
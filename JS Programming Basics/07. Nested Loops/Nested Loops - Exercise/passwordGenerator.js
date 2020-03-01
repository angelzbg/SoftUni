(input) => {
    const n = +input.shift(), l = +input.shift(), codeA = 'a'.charCodeAt(0);
    let output = '';
            for (let i1 = 1; i1 < n; i1++)
            {
                for (let i2 = 1; i2 < n; i2++)
                {
                    for (let i3 = codeA; i3 < codeA + l; i3++)
                    {
                        for (let i4 = codeA; i4 < codeA + l; i4++)
                        {
                            for (let i5 = 2; i5 <= n; i5++)
                            {
                                if (i5 > i1 && i5 > i2)
                                {
                                    output += `${i1}${i2}${String.fromCharCode(i3)}${String.fromCharCode(i4)}${i5} `;
                                } 
                            }
                        }
                    }
                }
            }

            console.log(output);
}
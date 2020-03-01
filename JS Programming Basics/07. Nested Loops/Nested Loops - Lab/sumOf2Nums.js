(input) => {
    const start = Number(input.shift()), end = Number(input.shift()), magic = Number(input.shift());

    let counter = 0, num = 0;
    Outer:
    for(let i=start; i<=end; i++) {
        for(let j=start; j<=end; j++) {
            counter++;
            num = i + j;
            if(num == magic) {
                console.log(`Combination N:${counter} (${i} + ${j} = ${magic})`);
                break Outer;
            }
        }
    }
    if(num != magic) console.log(`${counter} combinations - neither equals ${magic}`);
}
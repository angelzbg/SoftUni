(input) => {
    let kozunaci = Number(input.shift()),
        sugar = 0,
        flour = 0,
        maxSugar = Number.MIN_SAFE_INTEGER,
        maxFlour = Number.MIN_SAFE_INTEGER;
    for(let i=0; i<kozunaci; i++) {
        let s = Number(input.shift()),
            f = Number(input.shift());
        sugar += s;
        flour += f;
        if(s > maxSugar) maxSugar = s;
        if(f > maxFlour) maxFlour = f;
    }

    let packsSugar = Math.ceil(sugar/950),
        packsFlour = Math.ceil(flour/750);

    console.log(`Sugar: ${packsSugar}`);
    console.log(`Flour: ${packsFlour}`);
    console.log(`Max used flour is ${maxFlour} grams, max used sugar is ${maxSugar} grams.`);
}
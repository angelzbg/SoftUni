(input) => {
    let kozunaci = Number(input.shift()), qica = Number(input.shift()), kurabii = Number(input.shift());
    let price = kozunaci*3.2 + qica*4.35 + kurabii*5.40 + qica*12*0.15;
    console.log(price.toFixed(2));
}
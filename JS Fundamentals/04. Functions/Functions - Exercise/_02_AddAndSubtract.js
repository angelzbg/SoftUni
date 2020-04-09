addAndSubtract = (i1, i2, i3) => {
    let sum = (n1, n2) => n1 + n2;
    let subtract = (n1, n2) => n1 - n2;
    console.log(subtract(sum(i1, i2), i3));
}
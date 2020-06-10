addAndSubtract = (i1, i2, i3) => {
    const sum = (n1, n2) => n1 + n2;
    const subtract = (n1, n2) => n1 - n2;

    console.log(subtract(sum(i1, i2), i3));
};
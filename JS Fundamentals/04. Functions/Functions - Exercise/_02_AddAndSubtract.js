addAndSubtract = (i1 = 1, i2 = 1, i3 = 1) => {
    const sum = (n1, n2) => n1 + n2;
    const subtract = (n1, n2) => n1 - n2;

    console.log(subtract(sum(i1, i2), i3));
};

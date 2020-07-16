evenOddSubtraction = (arr = []) => {
    let even = (odd = 0);
    arr.forEach((el) => {
        if (el % 2 === 0) {
            even += el;
        } else {
            odd += el;
        }
    });

    console.log(even - odd);
};

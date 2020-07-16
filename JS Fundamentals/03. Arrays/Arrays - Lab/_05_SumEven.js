sumEven = (arr = []) => {
    let sum = 0;
    arr.map(Number).forEach((num) => {
        if (num % 2 === 0) {
            sum += num;
        }
    });

    console.log(sum);
};

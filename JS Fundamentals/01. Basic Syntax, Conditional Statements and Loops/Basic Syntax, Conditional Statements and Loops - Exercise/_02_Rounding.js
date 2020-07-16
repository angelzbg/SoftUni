rounding = (num = 1, pre = 1) => {
    console.log(parseFloat(num.toFixed(pre <= 15 ? pre : 15)));
};

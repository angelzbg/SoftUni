(num, pre) => {
    console.log(parseFloat(num.toFixed(pre <= 15 ? pre : 15)));
}
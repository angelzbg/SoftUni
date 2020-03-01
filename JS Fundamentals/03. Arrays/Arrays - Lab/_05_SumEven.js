(arr) => {
    let sum = 0;
    arr.forEach(el => {
        let num = Number(el);
        if(num % 2 == 0) sum += num;
    });
    console.log(sum);
}
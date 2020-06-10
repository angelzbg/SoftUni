addAndSubtract = (arr) => {
    let sum = arr.reduce((a, b) => a + b, 0);
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] % 2 == 0) arr[i] += i;
        else arr[i] -= i;
    }
    
    console.log(arr);
    console.log(sum);
    let newSum = arr.reduce((a, b) => a + b, 0);
    console.log(newSum);
};
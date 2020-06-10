nonDecreasingSubsequence = (arr) => {
    let newArr = [ arr[0] ];
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] >= newArr[newArr.length - 1]) {
            newArr.push(arr[i]);
        }
    }
    
    console.log(newArr.join(' '));
};
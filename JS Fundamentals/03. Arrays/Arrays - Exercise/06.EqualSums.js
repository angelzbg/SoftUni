(arr) => {
    for(let i=0; i<arr.length; i++) {
        let left = 0, right = 0;
        for(let j=0; j<arr.length; j++) {
            if(j<i) left += arr[j];
            else if(j>i) right += arr[j];
        }
        if(left == right) {
            console.log(i);
            return;
        }
    }
    console.log('no');
}
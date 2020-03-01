(arr, r) => {
    for(let i=0; i<r; i++) {
        arr.push(arr[0]);
        arr = arr.slice(1);
    }
    console.log(arr.join(' '));
}
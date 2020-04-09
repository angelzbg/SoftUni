arrayRotation = (arr, r) => {
    for(let i=0; i<r; i++) arr.push(arr.shift());
    console.log(arr.join(' '));
}
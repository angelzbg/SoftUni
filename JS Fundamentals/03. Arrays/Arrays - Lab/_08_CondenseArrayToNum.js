(arr) => {
    if(arr.length == 1) {
        console.log(arr[0]);
        return;
    }
    let condensed = arr;
    while(condensed.length > 2) {
        let temp = [];
        for(let i=0; i<condensed.length-1; i++) {
            temp.push(condensed[i] + condensed[i+1]);
        }
        condensed = temp;
    }
    let sum = condensed[0] + condensed[1];
    console.log(sum);
}
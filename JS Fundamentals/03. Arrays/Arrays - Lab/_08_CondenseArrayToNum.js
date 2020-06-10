condenseArrayToNum = (arr) => {
    if(arr.length === 1) return console.log(arr[0]);

    let condensed = arr;
    while(condensed.length > 2) {
        let temp = [];
        for(let i=0; i<condensed.length-1; i++) {
            temp.push(condensed[i] + condensed[i+1]);
        }
        condensed = temp;
    }
    
    console.log(condensed[0] + condensed[1]);
};
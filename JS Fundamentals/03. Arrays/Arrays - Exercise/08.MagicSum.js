(arr, num) => {
    let output = '';
    for(let i=0; i<arr.length-1; i++) {
        for(let j=i+1; j<arr.length; j++) {
            if(arr[i] + arr[j] === num) output += `${arr[i]} ${arr[j]}\n`;
        }
    }
    console.log(output);
}
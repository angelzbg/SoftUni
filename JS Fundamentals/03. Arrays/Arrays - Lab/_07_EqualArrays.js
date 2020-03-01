(arr1, arr2) => {
    let ar1 = arr1.map( el => Number(el));
    let ar2 = arr2.map( el => Number(el));
    let identical = true;
    for(let i=0; i<ar1.length; i++) {
        if(ar1[i] != ar2[i]) {
            console.log(`Arrays are not identical. Found difference at ${i} index`);
            identical = false;
            break;
        }
    }

    if(identical) {
        let sum = ar1.reduce((a, b) => a + b, 0);
        console.log(`Arrays are identical. Sum: ${sum}`);
    }
}
equalArrays = (arr1 = [], arr2 = []) => {
    [arr1, arr2] = [arr1.map(Number), arr2.map(Number)];

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) {
            return console.log(`Arrays are not identical. Found difference at ${i} index`);
        }
    }

    let sum = arr1.reduce((a, b) => a + b, 0);
    console.log(`Arrays are identical. Sum: ${sum}`);
};

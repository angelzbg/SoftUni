maxNumber = (arr = []) => {
    let biggest = arr[arr.length - 1];
    let output = [biggest];
    for (let i = arr.length - 2; i > -1; i--) {
        if (arr[i] > biggest) {
            output.splice(0, 0, arr[i]);
            biggest = arr[i];
        }
    }

    console.log(output.join(' '));
};

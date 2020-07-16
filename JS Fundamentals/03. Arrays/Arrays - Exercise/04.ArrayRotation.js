arrayRotation = (arr = [], r = 1) => {
    while (r--) {
        arr.push(arr.shift());
    }

    console.log(arr.join(' '));
};

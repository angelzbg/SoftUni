sorting = (array = []) => {
    array = array.sort((a, b) => a - b);
    let result = [];

    while (array.length) {
        result.push(array.pop(), array.shift());
    }

    console.log(result.join(' '));
};

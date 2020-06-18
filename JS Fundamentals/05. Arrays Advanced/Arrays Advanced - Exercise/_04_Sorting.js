sorting = (array) => {
    array = array.sort((a, b) => a - b);
	let result = [];

    while (array.length) {
        result.push(array.pop());
        result.push(array.shift());
    }

    console.log(result.join(' '));
};
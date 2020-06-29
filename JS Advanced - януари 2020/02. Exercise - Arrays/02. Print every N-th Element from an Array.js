printNthElements = (array = []) => {
    let [step, counter, index] = [Number(array.pop()), -1];
    while((index = ++counter * step) < array.length) {
        console.log(array[index]);
    }
};
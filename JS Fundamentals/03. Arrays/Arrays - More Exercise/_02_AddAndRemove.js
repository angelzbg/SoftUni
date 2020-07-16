addAndRemove = (arr = []) => {
    let [counter, newArr] = [0, []];
    arr.forEach((el) => {
        counter++;
        if (el === 'add') {
            newArr.push(counter);
        } else {
            newArr.pop();
        }
    });

    console.log(newArr.join(' ') || 'Empty');
};

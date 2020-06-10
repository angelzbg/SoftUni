addAndRemove = (arr) => {
    let counter = 0, newArr = [];
    arr.forEach(el => {
        counter++;
        if(el === 'add') {
            newArr.push(counter);
        } else {
            newArr.pop();
        }
    });

    console.log(newArr.join(' ') || 'Empty');
};
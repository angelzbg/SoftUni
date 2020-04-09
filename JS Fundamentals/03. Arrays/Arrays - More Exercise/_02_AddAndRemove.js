addAndRemove = (arr) => {
    let counter = 0, newArr = [];
    arr.forEach(el => {
        counter++;
        if(el === 'add') newArr.push(counter);
        else newArr.pop();
    });
    console.log(newArr.length === 0 ? 'Empty' : newArr.join(' '));
}
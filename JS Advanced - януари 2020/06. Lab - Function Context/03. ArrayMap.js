arrayMap = (array = [], func) => {
    const output = [];
    array.forEach((element) => {
        output.push(func(element));
    });
    return output;
};

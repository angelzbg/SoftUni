listOfProducts = (arr = []) => {
    arr.sort();
    let output = '';
    arr.forEach((prod, i) => {
        output += `${i + 1}.${prod}\n`;
    });

    console.log(output);
};

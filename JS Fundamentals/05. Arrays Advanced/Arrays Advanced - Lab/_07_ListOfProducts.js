listOfProducts = (arr) => {
    arr = arr.sort(), output = '';
    arr.forEach( (prod, i) => {
        output += `${i+1}.${prod}\n`;
    });
    
    console.log(output);
};
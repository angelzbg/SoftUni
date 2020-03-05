(arr) => {
    let sorted = arr.sort(), output = '';
    sorted.forEach( (prod, i) => {
        output += `${i+1}.${prod}\n`;
    });
    console.log(output);
}
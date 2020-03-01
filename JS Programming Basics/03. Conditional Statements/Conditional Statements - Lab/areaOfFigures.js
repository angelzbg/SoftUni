(input) => {
    const type = input.shift(), param1 = Number(input.shift());
    let result = 0;
    if(type === 'square') {
        result = param1*param1;
    } else if(type === 'rectangle') {
        result = param1*Number(input.shift());
    } else if(type === 'circle') {
        result = param1*param1*Math.PI;
    } else if(type === 'triangle') {
        result = (param1*Number(input.shift()))/2;
    }
    console.log(result.toFixed(3));
}
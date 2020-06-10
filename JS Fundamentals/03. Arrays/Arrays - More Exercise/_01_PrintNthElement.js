printNthElement = (arr) => {
    let indexStep = arr.length - 1, step = Number(arr[indexStep]), output = '';
    for(let i = 0; i < indexStep; i += step) {
        output += `${arr[i]} `;
    }
    console.log(output);
};
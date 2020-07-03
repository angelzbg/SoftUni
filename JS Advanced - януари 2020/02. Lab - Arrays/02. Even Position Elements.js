evenPositionElements = (numbers = []) => {
    let output = '';
    for (let i = 0; i < numbers.length; i += 2) {
        output += `${numbers[i]} `;
    }

    return output;
};

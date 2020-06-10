oddOccurrences = (arr) => {
    let occurrences = {};
    arr = arr.split(' ')
    .map(el => el.toLowerCase())
    .forEach(el => {
        occurrences[el] = 1 + (occurrences[el] || 0);
    });

    let output = '';
    Object.entries(occurrences)
    .forEach(([key, value]) => {
        if(value % 2 === 1) {
            output += `${key} `;
        }
    });
    
    console.log(output.trim());
}
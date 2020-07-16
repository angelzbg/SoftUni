lettersChangeNumbers = (string = '') => {
    const alphabetPosition = (letter) => parseInt(letter, 36) - 9;

    let sum = 0;
    let pattern = /(?<first>[A-Za-z])(?<number>[0-9]+)(?<last>[A-Za-z])/g;
    while ((result = pattern.exec(string)) !== null) {
        let first = result.groups.first,
            last = result.groups.last,
            number = Number(result.groups.number),
            firstAlphabetPosition = alphabetPosition(first),
            secondAlphabetPosition = alphabetPosition(last);

        if (first === first.toUpperCase()) number /= firstAlphabetPosition;
        else number *= firstAlphabetPosition;

        if (last === last.toUpperCase()) number -= secondAlphabetPosition;
        else number += secondAlphabetPosition;

        sum += number;
    }

    console.log(sum.toFixed(2));
};

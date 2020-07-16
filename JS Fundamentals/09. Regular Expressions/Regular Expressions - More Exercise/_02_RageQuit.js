rageQuit = ([input = '']) => {
    let output = '';
    let symbolsCount = new Set();
    let patternParts = /\D+\d+/g,
        patternNum = /\d+/g,
        patternSymbols = /\D+/g;

    while ((result = patternParts.exec(input))) {
        result = result[0].toUpperCase();
        let count = result.match(patternNum)[0];
        result = result.match(patternSymbols)[0];

        if (count > 0) {
            result.split('').forEach((ch) => symbolsCount.add(ch));
            output += result.repeat(count);
        }
    }

    console.log(`Unique symbols used: ${symbolsCount.size}`);
    console.log(output);
};

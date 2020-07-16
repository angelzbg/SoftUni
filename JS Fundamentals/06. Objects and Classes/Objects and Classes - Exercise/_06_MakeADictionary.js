makeDictionary = (input = []) => {
    const dictionary = input.reduce((dict, val) => Object.assign(dict, JSON.parse(val)), {});
    Object.keys(dictionary)
        .sort()
        .forEach((key) => {
            console.log(`Term: ${key} => Definition: ${dictionary[key]}`);
        });
};

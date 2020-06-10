makeDictionary = (input) => {
    let dictionary = {};
    input.forEach(line => {
        let obj = JSON.parse(line);
        Object.assign(dictionary, obj);
    });
    Object.keys(dictionary).sort().forEach(key => {
        console.log(`Term: ${key} => Definition: ${dictionary[key]}`);
    });
};
schoolGrade = (input = []) => {
    const storage = input.reduce((stor, line) => {
        let [name, ...grades] = line.split(' ');
        return Object.assign(stor, { [name]: (stor[name] || []).concat(grades.map(Number)) });
    }, {});

    Object.keys(storage)
        .sort(
            (a, b) =>
                storage[a].reduce((a, b) => a + b, 0) / storage[a].length -
                storage[b].reduce((a, b) => a + b, 0) / storage[b].length,
        )
        .forEach((name) => {
            console.log(`${name}: ${storage[name].join(', ')}`);
        });
};

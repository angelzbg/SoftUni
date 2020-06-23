schoolGrade = (input = []) => {
    let storage = {};
    input.forEach(el => {
        let split = el.split(' ');
        let name = split.shift(),
            grades = split.map(Number);
        storage[name] = (storage[name] || []).concat(grades);
    });

    Object.keys(storage)
    .sort((a, b) => storage[a].reduce((a, b) => a + b, 0) / storage[a].length - storage[b].reduce((a, b) => a + b, 0) / storage[b].length)
    .forEach(name => {
        console.log(`${name}: ${storage[name].join(', ')}`);
    });
};
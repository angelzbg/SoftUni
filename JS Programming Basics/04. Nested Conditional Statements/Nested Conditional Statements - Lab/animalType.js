(input) => {
    const animals = {
        'dog': 'mammal',
        'crocodile': 'reptile',
        'tortoise': 'reptile',
        'snake': 'reptile'
    };
    const animal = input.shift();
    if(animals[animal] !== undefined) console.log(animals[animal]);
    else console.log('unknown');
}
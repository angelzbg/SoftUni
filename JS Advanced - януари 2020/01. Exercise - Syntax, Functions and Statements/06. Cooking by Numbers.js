cookingByNumbers = (input = []) => {
    let number = Number(input.shift());

    const operations = {
        chop: (x) => x / 2,
        dice: (x) => Math.sqrt(x),
        spice: (x) => x + 1,
        bake: (x) => x * 3,
        fillet: (x) => x - x / 5
    };


    const cook = (number = 1, operations = {}, commands = [], index = 0) => {
        if(!commands[index]) {
            return;
        }

        console.log((number = operations[commands[index++]](number)));
        cook(number, operations, commands, index);
    };

    cook(number, operations, input);
};
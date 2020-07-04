shoppingList = (input = []) => {
    let list = input.shift().split('!');
    while (([cmd, product, replacement] = input.shift().split(' '))[0] !== 'Go') {
        if (cmd === 'Urgent') {
            if (!list.includes(product)) {
                list.unshift(product);
            }
        } else if (cmd === 'Unnecessary') {
            list = list.filter((p) => p !== product);
        } else if (cmd === 'Correct') {
            if ((index = list.indexOf(product)) !== -1) {
                list[index] = replacement;
            }
        } else {
            // 'Rearrange'
            if ((index = list.indexOf(product)) !== -1) {
                list.splice(index, 1);
                list.push(product);
            }
        }
    }

    return list.join(', ');
};

console.log(
    shoppingList([
        'Milk!Pepper!Salt!Water!Banana',
        'Urgent Salt',
        'Unnecessary Grapes ',
        'Correct Pepper Onion',
        'Rearrange Grapes',
        'Correct Tomatoes Potatoes',
        'Go Shopping!',
    ]),
);

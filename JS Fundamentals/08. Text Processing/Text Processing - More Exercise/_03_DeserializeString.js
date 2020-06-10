deserializeString = (serialized) => {
    let symbols = [];
    while((line = serialized.shift().split(':'))[0] !== 'end') {
        let symbol = line.shift();
        line.shift().split('/').map(Number).forEach(index => {
            symbols[index] = symbol;
        });
    }
    console.log(symbols.join(''));
};
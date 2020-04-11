deserializeString = (serialized) => {
    let symbols = [];
    while((line = serialized.shift()) !== 'end') {
        line = line.split(':');
        let symbol = line.shift();
        line.shift().split('/').map(Number).forEach(index => {
            symbols[index] = symbol;
        });
    }
    console.log(symbols.join(''));
}
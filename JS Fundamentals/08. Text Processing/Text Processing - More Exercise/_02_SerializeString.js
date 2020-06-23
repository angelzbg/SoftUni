serializeString = ([ string = '' ]) => {
    let symbols = {};
    string.split('').forEach((symbol, index) => {
        symbols[symbol] = (symbols[symbol] || []).concat(index);
    });
    
    Object.entries(symbols).forEach(([symbol, indexes]) => {
        console.log(`${symbol}:${indexes.join('/')}`);
    });
};
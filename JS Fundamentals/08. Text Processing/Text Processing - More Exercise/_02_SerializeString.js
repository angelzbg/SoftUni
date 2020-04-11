serializeString = ([ string ]) => {
    let symbols = {};
    string.split('').forEach((symbol, index) => {
        if(symbols[symbol]) symbols[symbol].push(index);
        else symbols[symbol] = [ index ];
    });
    Object.entries(symbols).forEach(([symbol, indexes]) => {
        console.log(`${symbol}:${indexes.join('/')}`);
    });
}
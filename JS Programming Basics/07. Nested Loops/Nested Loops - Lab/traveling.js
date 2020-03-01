(input) => {
    let line = input.shift(), destination = '', needed = 0, current = 0;
    while(line !== 'End') {
        if(isNaN(line)) {
            destination = line;
            needed = Number(input.shift());
            current = 0;
        } else {
            current += Number(line);
            if(current >= needed) console.log(`Going to ${destination}!`);
        }
        line = input.shift();
    }
}
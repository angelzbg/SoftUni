treasureFinder = (input) => {
    let keys = input.shift().split(' ').map(Number);
    while((line = input.shift()) !== 'find') {
        let keyIndex = -1;
        line = line.split('').map(ch => {
            if(keyIndex === keys.length - 1) keyIndex = 0;
            else keyIndex++;
            return String.fromCharCode(ch.charCodeAt(0) - keys[keyIndex]);
        }).join('');
        let result = /(.+)?&(?<type>.+)&(.+)?<(?<coords>.+)>/g.exec(line).groups;
        console.log(`Found ${result.type} at ${result.coords}`);
    }
}
(input) => {
    let eggsCount = Number(input.shift());
    let eggs = [ 0, 0, 0, 0];
    let colors = [ 'red', 'orange', 'blue', 'green' ];

    for(let i=0; i<eggsCount; i++) {
        let c = input[i];
        let index = c === 'red' ? 0 : c === 'orange' ? 1 : c === 'blue' ? 2 : 3;
        eggs[index]++;
    }

    let max = Math.max(...eggs);
    let maxIndex = eggs.indexOf(max);
    
    for(let i=0; i<4; i++) {
        console.log(`${colors[i].charAt(0).toUpperCase() + colors[i].slice(1)} eggs: ${eggs[i]}`);
    }

    console.log(`Max eggs: ${max} -> ${colors[maxIndex]}`);
}
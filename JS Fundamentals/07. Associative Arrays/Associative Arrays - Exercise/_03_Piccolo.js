piccolo = (input) => {
    let cars = new Set();
    input.forEach(line => {
        let [ direction, car ] = line.split(', ');
        if(direction === 'IN') cars.add(car);
        else cars.delete(car);
    });
    [...cars].sort().forEach(car => console.log(car));
}

piccolo(['IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'IN, CA9999TT',
'IN, CA2866HI',
'OUT, CA1234TA',
'IN, CA2844AA',
'OUT, CA2866HI',
'IN, CA9876HH',
'IN, CA2822UU']);

piccolo(['IN, CA2844AA',
'IN, CA1234TA',
'OUT, CA2844AA',
'OUT, CA1234TA']);
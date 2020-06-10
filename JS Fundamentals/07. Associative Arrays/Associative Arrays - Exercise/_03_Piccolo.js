piccolo = (input) => {
    let cars = new Set();
    input.forEach(line => {
        let [ direction, car ] = line.split(', ');
        if(direction === 'IN') {
            cars.add(car);
        } else {
            cars.delete(car);
        }
    });
    
    [...cars].sort().forEach(car => console.log(car));
}
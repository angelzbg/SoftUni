ladyBugs = (input) => {
    let size = Number(input.shift());
    let field = [];
    for(let i=0; i<size; i++) field.push(0);

    let indexes = input.shift().split(' ').map(el => Number(el));

    for (let i = 0; i < indexes.length; i++) {
        if (indexes[i] >= 0 && indexes[i] < field.length) {
            field[indexes[i]] = 1;
        }
    }

    for(let i=0; i<input.length; i++) {
        let line = input[i].split(" ");
        let index = Number(line[0]), direction = line[1], flight = Number(line[2]);

        if (index < 0 || index >= field.length || field[index] === 0) continue;

        field[index] = 0;
        let currentFlight = flight;
        if (direction === "right") {
            while (index + currentFlight < field.length && index + currentFlight >= 0) {
                if (field[index + currentFlight] === 0) {
                    field[index + currentFlight] = 1;
                    break;
                } else {
                    currentFlight += flight;
                }
            }
        } else if (direction === "left") {
            while (index - currentFlight >= 0 && index - currentFlight < field.length) {
                if (field[index - currentFlight] === 0) {
                    field[index - currentFlight] = 1;
                    break;
                } else {
                    currentFlight += flight;
                }
            }
        }
    }
    console.log(field.join(' '));
}
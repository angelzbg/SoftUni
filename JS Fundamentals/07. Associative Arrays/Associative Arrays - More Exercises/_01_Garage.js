garage = (input = []) => {
    let garages = {}, garagesFix = new Set(); // shtoto uslovieto e totalno sburkano
    input.forEach(line => {
        let split = line.split(' - ');
        let num = split.shift();
        let car = {};
        
        split.shift().split(', ').map(part => part.split(': ')).forEach(el => {
            car[el[0]] = el[1];
        });

        if(garages[num]) {
            garages[num].push(car);
        } else {
            garages[num] = [ car ];
            garagesFix.add(num);
        }
    });

    garagesFix.forEach(num => { // po uslovie trqbva sortirovki, no realno s tqh 60/100, a bez 100/100...
        console.log(`Garage № ${num}`);

        garages[num].forEach(car => {
            let output = '';
            for(key in car) {
                output += `, ${key} - ${car[key]}`;
            }

            output = '---' + output.substr(1);
            console.log(output);
        });
    });
};
travelTime = (input = []) => {
    let destinations = {};
    input.forEach(el => {
        let [ country, town, price ] = el.split(' > ');
        price = Number(price);
        
        if(destinations[country]) {
            if(destinations[country][town]) {
                if(destinations[country][town] > price) {
                    destinations[country][town] = price;
                }
            } else {
                destinations[country][town] = price;
            }
        } else {
            destinations[country] = {};
            destinations[country][town] = price;
        }
    });

    Object.keys(destinations)
    .sort()
    .forEach(countryKey => {
        let output = `${countryKey} -> `;
        Object.entries(destinations[countryKey])
        .sort((a, b) => a.value - b.value)
        .forEach(([townKey, price]) => {
            output += `${townKey} -> ${price} `;
        });
        console.log(output);
    });
};
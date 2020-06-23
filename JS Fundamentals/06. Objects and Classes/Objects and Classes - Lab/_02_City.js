city = (name = '', area = '', population = 1, country = '', postCode = 1) => {
    let city = { name, area, population, country, postCode };
    Object.entries(city).forEach( ([key, value]) => {
        console.log(`${key} -> ${value}`);
    });
};
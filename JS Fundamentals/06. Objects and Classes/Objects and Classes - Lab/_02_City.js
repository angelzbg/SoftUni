city = (name, area, population, country, postCode) => {
    let city = { name, area, population, country, postCode };
    Object.entries(city).forEach( ([key, value]) => {
        console.log(`${key} -> ${value}`);
    });
};
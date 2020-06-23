towns = (input = []) => {
    input.forEach(el => {
        let [ town, latitude, longitude ] = el.split(' | ');
        console.log({ town, latitude: Number(latitude).toFixed(2), longitude: Number(longitude).toFixed(2) });
    });
};
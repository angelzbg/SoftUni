neighborhoods = (input) => {
    let neighborhoods = {};
    input.shift().split(', ').forEach(neighborhood => {
        neighborhoods[neighborhood] = [];
    });

    input.forEach(line => {
        let [ neighborhood, person ] = line.split(' - ');
        if(neighborhoods[neighborhood]) {
            neighborhoods[neighborhood].push(person);
        }
    });
    
    Object.keys(neighborhoods)
    .sort((a, b) => neighborhoods[b].length - neighborhoods[a].length)
    .forEach(neighborhood => {
        console.log(`${neighborhood}: ${neighborhoods[neighborhood].length}`);
        neighborhoods[neighborhood].forEach(person => console.log(`--${person}`));
    });
};
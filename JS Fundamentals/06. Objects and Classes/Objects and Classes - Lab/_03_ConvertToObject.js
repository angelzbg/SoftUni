convertToObject = (jsonStr = '') => {
    Object.entries(JSON.parse(jsonStr))
    .forEach( ([key, value]) => console.log(`${key}: ${value}`) );
};
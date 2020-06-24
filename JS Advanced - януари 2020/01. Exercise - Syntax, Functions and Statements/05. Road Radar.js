roadRadar = ([speed = 1, area = ''] = []) => {
    const limits = {
        residential: 20,
        city: 50,
        interstate: 90,
        motorway: 130
    };

    const speedings = {
        0: 'speeding',
        20: 'excessive speeding',
        40: 'reckless driving'
    };

    const getOverSpeedPrint = (overLimit = 0, speedings = {}) => {
        if(overLimit < 1) {
            return;
        }

        const printKey =
            Object
            .keys(speedings)
            .sort((a, b) => b - a)
            .find(over => overLimit > over);
        
        return speedings[printKey] || '';
    };

    return getOverSpeedPrint(speed - limits[area], speedings);
};
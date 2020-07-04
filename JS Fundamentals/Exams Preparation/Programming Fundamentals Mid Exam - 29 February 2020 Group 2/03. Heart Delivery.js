heartDelivery = (input = []) => {
    let houses = input.shift().split('@').map(Number);
    let index = 0;

    while (([jump, len] = input.shift().split(' ').map(Number))[1] !== undefined) {
        while (len > 0) {
            [index, len] = [index + 1, len - 1];
            if (index === houses.length) {
                index = 0;
                break;
            }
        }

        if (houses[index] === 0) {
            console.log(`Place ${index} already had Valentine's day.`);
        } else {
            houses[index] -= 2;
            if (houses[index] === 0) {
                console.log(`Place ${index} has Valentine's day.`);
            }
        }
    }

    console.log(`Cupid's last position was ${index}.`);
    let failedHouses = houses.filter((h) => h > 0).length;
    console.log(!failedHouses ? 'Mission was successful.' : `Cupid has failed ${failedHouses} places.`);
};

heartDelivery(['2@4@2', 'Jump 2', 'Jump 2', 'Jump 8', 'Jump 3', 'Jump 1', 'Love!']);

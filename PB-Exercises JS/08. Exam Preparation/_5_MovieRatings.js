(input) => {
    const times = +input.shift();
    let highestName = '', highestRating = 0,
        lowestName = '', lowestRating = 11,
        sum = 0;

    for(let i=0; i<times; i++) {
        let name = input.shift(), rating = +input.shift();

        if(rating > highestRating) {
            highestRating = rating;
            highestName = name;
        }
        if(rating < lowestRating) {
            lowestRating = rating;
            lowestName = name;
        }

        sum += rating;
    }

    const average = (sum/times).toFixed(1);

    console.log(`${highestName} is with highest rating: ${highestRating.toFixed(1)}`);
    console.log(`${lowestName} is with lowest rating: ${lowestRating.toFixed(1)}`);
    console.log(`Average rating: ${average}`);
}
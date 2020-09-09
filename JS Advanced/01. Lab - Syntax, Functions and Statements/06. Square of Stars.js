squareOfStars = (size = 5) => {
    new Array(size).fill(new Array(size).fill('*')).forEach((galaxy) => {
        console.log(galaxy.join(' '));
    });
};

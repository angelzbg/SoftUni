aggregateElements = (array = []) => {

    const sum = (array = []) => {
        return array.reduce((a, b) => a + b, 0);
    };

    const sumInverse = (array = []) => {
        return array.reduce((a, b) => a + 1 / b, 0);
    };

    const concatArray = (array = []) => {
        return array.join('');
    };

    const aggregate = (array = [], callback) => {
        return callback(array);
    };

    console.log(aggregate(array, sum));
    console.log(aggregate(array, sumInverse));
    console.log(aggregate(array, concatArray));
};
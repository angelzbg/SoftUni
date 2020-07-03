sumByTown = (towns = []) => {
    let sums = {};
    towns.forEach((town, idx) => {
        sums[town] = Number(towns.splice(idx + 1, 1)) + (sums[town] || 0);
    });

    return JSON.stringify(sums);
};

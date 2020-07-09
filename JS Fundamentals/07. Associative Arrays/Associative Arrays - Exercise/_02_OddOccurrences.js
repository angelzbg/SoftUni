oddOccurrences = (str = '') => {
    return Object.entries(
        str
            .toLowerCase()
            .split(' ')
            .reduce((occ, word) => {
                occ[word] = 1 + (occ[word] || 0);
                return occ;
            }, {}),
    )
        .filter(([key, value]) => value % 2 === 1)
        .map(([key, value]) => key)
        .join(' ');
};

extractIncreasingSubsequence = (array = []) => {
    return array
        .reduce((acc, val) => {
            if (val >= acc[acc.length - 1] || !acc.length) {
                acc.push(val);
            }
            return acc;
        }, [])
        .join('\n');
};

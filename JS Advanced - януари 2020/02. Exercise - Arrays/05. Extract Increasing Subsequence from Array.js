extractIncreasingSubsequence = (array = []) => {
    return array
            .reduce((acc, val) => {
                if(val >= acc[acc.length - 1] || !acc.length) {
                    acc.push(val);
                }
                return acc;
            }, [])
            .join('\n');
};

console.log(extractIncreasingSubsequence([1, 
    3, 
    8, 
    4, 
    10, 
    12, 
    3, 
    2, 
    24]));
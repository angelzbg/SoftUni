stringLength = (str1, str2, str3) => {
    const getStringsLength = (...strings) => {
        return strings.join('').length;
    };

    const getAverage = (sum, count) => {
        return Math.floor(sum / count);
    };

    const stringsLength = getStringsLength(str1, str2, str3);
    const averageLength = getAverage(stringsLength, 3);
    
    console.log(stringsLength);
    console.log(averageLength);
};
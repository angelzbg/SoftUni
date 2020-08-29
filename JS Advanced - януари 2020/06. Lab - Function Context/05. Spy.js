spy = (obj = {}, funcName = '') => {
    const result = { count: 0 };
    const func = obj[funcName];
    obj[funcName] = function () {
        result.count++;
        return func.apply(this, arguments);
    };
    return result;
};

add = (num = 0, sum = 0) => {
    sum += num;

    const func = (next = 0) => {
        sum += next;
        return func;
    };

    func.valueOf = () => sum;
    return func;
};

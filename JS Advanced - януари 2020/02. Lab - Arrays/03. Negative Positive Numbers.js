negativePositiveNumbers = (numbers = []) => {
    return numbers
        .reduce((acc, current) => {
            acc[current < 0 ? 'unshift' : 'push'](current);
            return acc;
        }, [])
        .join('\n');
};
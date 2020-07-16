amazingNumbers = (num = 1) => {
    const result = num
        .toString()
        .split('')
        .reduce((a, b) => Number(a) + Number(b), 0)
        .toString()
        .includes('9')
        ? 'True'
        : 'False';
    console.log(`${num} Amazing? ${result}`);
};

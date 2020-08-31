function argumentsInfo() {
    const [args, counts] = Object.values(arguments).reduce(
        ([args, counts], value) => {
            const type = typeof value;
            args.push(`${type}: ${value}`);
            counts[type] = 1 + (counts[type] || 0);
            return [args, counts];
        },
        [[], {}],
    );

    args.forEach((element) => {
        console.log(element);
    });

    Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([type, count]) => `${type} = ${count}`)
        .forEach((element) => {
            console.log(element);
        });
}

neighborhoods = (input = []) => {
    return Object.entries(
        input
            .slice(1)
            .map((line) => line.split(' - '))
            .reduce(
                (neighborhoods, [neighborhood, person]) => {
                    if (neighborhoods[neighborhood]) {
                        neighborhoods[neighborhood].push(person);
                    }

                    return neighborhoods;
                },
                input[0]
                    .split(', ')
                    .reduce((neighborhoods, neighborhood) => Object.assign(neighborhoods, { [neighborhood]: [] }), {}),
            ),
    )
        .sort((a, b) => b[1].length - a[1].length)
        .map(
            ([neighborhood, people]) =>
                `${neighborhood}: ${people.length}${people.length ? `\n--${people.join('\n--')}` : ''}`,
        )
        .join('\n');
};

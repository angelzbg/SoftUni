uniqueSequences = (arrays = []) =>
    Object.entries(
        arrays.reduce((acc, arr) => {
            const current = JSON.parse(arr).sort((a, b) => b - a);
            acc[`[${current.join(', ')}]`] = current.length;
            return acc;
        }, {}),
    )
        .sort((a, b) => a[1] - b[1])
        .map(([key, value]) => key)
        .join('\n');

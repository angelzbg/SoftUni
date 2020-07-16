wordOccurrences = (input = []) => {
    let words = {};
    input.forEach((word) => (words[word] = 1 + (words[word] || 0)));

    Object.keys(words)
        .sort((a, b) => words[b] - words[a])
        .forEach((word) => {
            console.log(`${word} -> ${words[word]} times`);
        });
};

countWords = ([text = '']) =>
    JSON.stringify(
        text
            .match(/\w+/g)
            .reduce(
                (words, word) =>
                    Object.assign(words, { [word]: 1 + (words[word] || 0) }),
                {},
            ),
    );

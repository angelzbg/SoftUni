usernames = (names = []) =>
    [...new Set(names)]
        .sort((a, b) => a.length - b.length || a.localeCompare(b))
        .join('\n');

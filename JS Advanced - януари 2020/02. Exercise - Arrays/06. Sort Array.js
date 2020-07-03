sortArray = (strings = []) => {
    return strings.sort((a, b) => a.length - b.length || a.localeCompare(b)).join('\n');
};

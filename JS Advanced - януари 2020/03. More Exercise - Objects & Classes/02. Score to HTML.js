scoreToHTML = (jsonStr = '') => {
    const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' };
    const escapeHTML = (str) => str.replace(/[&<>'"]/g, (tag) => entities[tag]);

    return (
        '<table>' +
        '\n\t<tr><th>name</th><th>score</th></tr>' +
        JSON.parse(jsonStr)
            .map((el) => `\n\t<tr><td>${escapeHTML(el.name)}</td><td>${el.score}</td></tr>`)
            .join('') +
        '\n</table>'
    );
};

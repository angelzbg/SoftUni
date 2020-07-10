solve = () => {
    const paragraphs =
        '<p>' +
        document
            .getElementById('input')
            .innerText.match(/[^\.!\?]+[\.!\?]+ ?/g)
            .reduce(
                (ps, sentence, idx) => {
                    if (idx > 1 && idx % 3 === 0) {
                        ps.push(`${sentence} `);
                    } else {
                        ps[ps.length - 1] += `${sentence} `;
                    }

                    return ps;
                },
                [''],
            )
            .join('</p><p>') +
        '</p>';
    document.getElementById('output').innerHTML = paragraphs;
};

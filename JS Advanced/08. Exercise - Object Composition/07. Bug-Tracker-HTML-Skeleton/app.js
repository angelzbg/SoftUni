solve = () => {
    let ids = 0;
    const genID = () => ids++;

    let reports = {};

    let sortMethod = 'ID';
    const sorts = {
        author: (a, b) => a.author.localeCompare(b.author),
        severity: (a, b) => a.severity - b.severity,
        ID: (a, b) => a.ID - b.ID,
    };

    const genReportHTML = ({ ID, author, description, reproducible, severity, status }) => {
        return (
            `<div id="report_${ID}" class="report">` +
                '<div class="body">' +
                    `<p>${description}</p>` +
                '</div>' +
                '<div class="title">' +
                    `<span class="author">Submitted by: ${author}</span>` +
                    `<span class="status">${status} | ${severity}</span>` +
                '</div>' +
            '</div>'
        );
    };

    let selector;
    const display = () => {
        if (!selector) {
            return;
        }

        selector.innerHTML = Object.values(reports).sort(sorts[sortMethod]).map(genReportHTML).join('\n');
    };

    return {
        report: (author, description, reproducible, severity) => {
            const id = genID();
            reports[id] = { ID: id, author, description, reproducible, severity, status: 'Open' };
            display();
        },
        setStatus: (id, newStatus) => {
            reports[id].status = newStatus;
            display();
        },
        remove: (id) => {
            delete reports[id];
            display();
        },
        sort: (method) => {
            sortMethod = method;
            display();
        },
        output: (newSelector) => (selector = document.querySelector(newSelector)),
    };
};

jsonsTable = (data = []) => {
    const getColumns = (content) => content.map((val) => `\t\t<td>${val}</td>`).join('\n');
    const getRows = (content) => content.map((row) => `\t<tr>\n${getColumns(Object.values(row))}\n\t</tr>`).join('\n');
    const getTable = (content) => `<table>\n${getRows(content.map(JSON.parse))}\n</table>`;
    return getTable(data);
};

solve = () => {
    const tableRows = document.querySelectorAll('tbody tr');
    const inputField = document.getElementById('searchField');
    document.getElementById('searchBtn').addEventListener('click', () => {
        const searchString = inputField.value;
        for (let row of tableRows) {
            row.className = row.textContent.includes(searchString) ? 'select' : '';
        }
        inputField.value = '';
    });
};

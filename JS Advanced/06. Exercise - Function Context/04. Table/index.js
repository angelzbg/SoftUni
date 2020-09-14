solve = () => {
    const rows = [...document.querySelectorAll('table > tbody > tr')];
    const clickedBackground = 'rgb(65, 63, 94)';
    rows.forEach((row, index) => {
        row.addEventListener('click', () => {
            const background = row.style.backgroundColor === clickedBackground ? '' : clickedBackground;
            rows.forEach((row) => (row.style.backgroundColor = ''));
            row.style.backgroundColor = background;
        });
    });
};

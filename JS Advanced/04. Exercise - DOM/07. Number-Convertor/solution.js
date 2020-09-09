solve = () => {
    const selectMenuTo = document.getElementById('selectMenuTo');
    const input = document.getElementById('input');
    const result = document.getElementById('result');

    selectMenuTo.insertAdjacentHTML(
        'beforeend',
        '<option value="binary">Binary</option>' + '<option value="hexadecimal">Hexadecimal</option>',
    );

    document.getElementsByTagName('button')[0].addEventListener('click', () => {
        const value = selectMenuTo.value;
        const number = input.value;
        if (!value || !number) {
            return;
        }

        document.getElementById('result').value = Number(number)
            .toString(value === 'binary' ? 2 : 16)
            .toUpperCase();
    });
};

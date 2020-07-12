addItem = () => {
    const text = document.getElementById('newItemText');
    const value = document.getElementById('newItemValue');

    document
        .getElementById('menu')
        .insertAdjacentHTML('beforeend', `<option value="${value.value}">${text.value}</option>`);

    text.value = '';
    value.value = '';
};

addItem = () => {
    const input = document.getElementById('newItemText');
    document.getElementById('items').insertAdjacentHTML('beforeend', `<li>${input.value}</li>`);
    input.value = '';
};

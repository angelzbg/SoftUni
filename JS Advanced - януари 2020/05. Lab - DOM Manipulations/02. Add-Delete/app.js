addItem = () => {
    const input = document.getElementById('newText');

    const newItem = document.createElement('li');
    document.getElementById('items').appendChild(newItem);
    newItem.textContent = input.value;
    const link = document.createElement('a');
    newItem.appendChild(link);
    link.textContent = '[Delete]';
    link.href = '#';
    link.addEventListener('click', () => {
        document.getElementById('items').removeChild(newItem);
    });

    input.value = '';
};

solve = () => {
    const box = document.getElementById('box');
    const ul = document.getElementById('dropdown-ul');
    document.getElementById('dropdown').addEventListener('click', () => {
        const display = ul.style.display === 'block' ? 'none' : 'block';
        ul.style.display = display;
        if (display === 'none') {
            box.style['background-color'] = 'black';
            box.style['color'] = 'white';
        }
    });
    [...ul.querySelectorAll('li')].forEach((li) => {
        li.addEventListener('click', () => {
            box.style['background-color'] = li.textContent;
            box.style['color'] = 'black';
        });
    });
};

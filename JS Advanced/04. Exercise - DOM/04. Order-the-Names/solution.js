solve = () => {
    const list = document.getElementsByTagName('li');
    const names = 'abcdefghijklmnopqrstuvwxyz'
        .toUpperCase()
        .split('')
        .reduce((names, letter, idx) => Object.assign(names, { [letter]: list[idx].textContent }), {});

    const getSortedList = (names = {}) => {
        return '<li>' + Object.values(names).join('</li><li>') + '</li>';
    };

    document.getElementsByTagName('button')[0].addEventListener('click', () => {
        let name = document.getElementsByTagName('input')[0].value;
        if (!name) {
            return;
        }

        name = `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

        if (names[name[0].toUpperCase()]) {
            names[name[0].toUpperCase()] += `, ${name}`;
        } else {
            names[name[0].toUpperCase()] = name;
        }

        const ol = document.getElementsByTagName('ol')[0];
        ol.innerHTML = getSortedList(names);

        document.getElementsByTagName('input')[0].value = '';
    });
};

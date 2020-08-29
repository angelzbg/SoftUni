lockedProfile = () => {
    [...document.getElementById('main').querySelectorAll('div.profile')].forEach((parent) => {
        const button = parent.querySelector('button');
        button.addEventListener('click', () => {
            if (!parent.querySelector('input').checked) {
                const $hiddenInfo = parent.querySelector('div');
                if (button.textContent === 'Show more') {
                    $hiddenInfo.style.display = 'inline-block';
                    button.textContent = 'Hide it';
                } else if (button.textContent === 'Hide it') {
                    $hiddenInfo.style.display = 'none';
                    button.textContent = 'Show more';
                }
            }
        });
    });
};

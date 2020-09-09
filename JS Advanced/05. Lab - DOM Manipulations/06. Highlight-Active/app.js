focus = () => {
    const changeFocus = (event) => {
        const parent = event.target.parentNode;
        parent.className = parent.className ? '' : 'focused';
    };

    for (el of document.getElementsByTagName('input')) {
        const input = el;
        input.addEventListener('focus', changeFocus);
        input.addEventListener('blur', changeFocus);
    }
};

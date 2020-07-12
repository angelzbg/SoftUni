toggle = () => {
    const button = document.getElementsByClassName('button')[0];
    const content = document.getElementById('extra');

    let textContent, display;
    if (content.style.display === 'block') {
        [textContent, display] = ['More', 'none'];
    } else {
        [textContent, display] = ['Less', 'block'];
    }

    [button.textContent, content.style.display] = [textContent, display];
};

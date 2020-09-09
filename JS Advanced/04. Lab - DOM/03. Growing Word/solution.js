growingWord = () => {
    const colors = ['blue', 'green', 'red'];
    const paragraph = document.querySelector('#exercise > p');
    const fontSize = Number((paragraph.style.fontSize || '0px').split('px').shift());
    const color = colors.indexOf(paragraph.style.color || 'red');
    paragraph.style = `color: ${colors[color + 1] || colors[0]}; font-size: ${(fontSize || 1) * 2}px;`;
};

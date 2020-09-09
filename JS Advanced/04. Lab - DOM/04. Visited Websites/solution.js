solve = () => {
    const clickElement = (index) => {
        const paragraphs = document.getElementsByTagName('p');
        const paragraph = paragraphs[index];
        const clicks = Number(paragraph.textContent.match(/\d+/g).shift()) + 1;
        paragraph.innerHTML = `visited ${clicks} times`;
    };
    let counter = 0;
    const elements = document.getElementsByTagName('a');
    for (element of elements) {
        const index = counter++;
        element.addEventListener('click', () => clickElement(index));
    }
};

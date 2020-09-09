create = (words) => {
    const showSectionContent = (paragraph) => {
        paragraph.style.display = 'block';
    };

    const content = document.getElementById('content');
    words.forEach((sectionTextContent) => {
        const section = document.createElement('div');
        const paragraph = document.createElement('p');
        paragraph.textContent = sectionTextContent;
        paragraph.style.display = 'none';
        section.appendChild(paragraph);
        content.appendChild(section);
        section.addEventListener('click', () => showSectionContent(paragraph));
    });
};

solve = () => {
  const paragraphs = document.querySelectorAll(`div.middled > div > p`);

  const clickElement = (paragraph) =>
    (paragraph.innerHTML = `visited ${+paragraph.textContent.match(/\d+/g).shift() + 1} times`);

  [...document.getElementsByTagName('a')].forEach((element, index) =>
    element.addEventListener('click', () => clickElement(paragraphs[index]))
  );
};

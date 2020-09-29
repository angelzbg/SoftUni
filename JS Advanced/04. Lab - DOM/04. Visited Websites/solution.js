solve = () => {
  const clickElement = (paragraph) =>
    (paragraph.innerHTML = `visited ${+paragraph.textContent.match(/\d+/g).shift() + 1} times`);

  [...document.getElementsByTagName('a')].forEach((element, index) =>
    element.addEventListener('click', () =>
      clickElement(document.querySelector(`div.middled > div:nth-child(${index + 1}) > p`))
    )
  );
};

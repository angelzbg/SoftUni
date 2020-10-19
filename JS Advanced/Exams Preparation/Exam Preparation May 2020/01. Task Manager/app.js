function solve() {
  const byIDs = (...ids) => ids.map((id) => document.getElementById(id));
  const createElements = (...types) => types.map((type) => document.createElement(type));

  const append = (child, parent) => {
    parent.appendChild(child);
    return (nextChild, nextParent) => append(nextChild, nextParent || parent);
  };

  const [open, progress, complete] = [...document.querySelectorAll('.wrapper section div:nth-child(2)')].slice(1);

  const [taskIn, descriptionIn, dateIn, add] = byIDs('task', 'description', 'date', 'add');
  add.addEventListener('click', (event) => {
    event.preventDefault();
    const [name, description, due] = [taskIn, descriptionIn, dateIn].map((el) => el.value.trim());
    if (![name, description, due].filter((value) => !value).length) {
      [taskIn, descriptionIn, dateIn].forEach((el) => (el.value = ''));

      const elements = createElements('article', 'h3', 'p', 'p', 'div', 'button', 'button', 'button');
      const [article, h3, pDescription, pDue, div, buttonStart, buttonDelete, buttonFinish] = elements;

      const classes = ['flex', 'green', 'red', 'orange'];
      [div, buttonStart, buttonDelete, buttonFinish].forEach((el, i) => (el.className = classes[i]));

      const texts = [name, `Description: ${description}`, `Due Date: ${due}`, 'Start', 'Delete', 'Finish'];
      [h3, pDescription, pDue, buttonStart, buttonDelete, buttonFinish].forEach((el, i) => (el.textContent = texts[i]));

      buttonStart.addEventListener('click', () => {
        div.removeChild(buttonStart);
        append(buttonFinish, div)(article, progress);
      });

      buttonDelete.addEventListener('click', () => article.parentElement.removeChild(article));

      buttonFinish.addEventListener('click', () => {
        article.removeChild(div);
        append(article, complete);
      });

      append(h3, article)(pDescription)(pDue)(div)(buttonStart, div)(buttonDelete)(article, open);
    }
  });
}

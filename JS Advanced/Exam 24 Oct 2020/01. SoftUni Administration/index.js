function solve(modules = {}) {
  const createElements = (...types) => types.map((type) => document.createElement(type));
  const append = (child, parent) => {
    parent.appendChild(child);
    return (nextChild, nextParent) => append(nextChild, nextParent || parent);
  };

  const elements = [...document.querySelectorAll('input, select, button, .modules, form')];
  const [modulesList, form, nameIn, dateIn, selectIn, add] = elements;

  const render = () => {
    modulesList.innerHTML = '';
    Object.entries(modules).forEach(([modulE, lectures]) => {
      const [div, h3, ul] = createElements('div', 'h3', 'ul');
      [div.className, h3.textContent] = ['module', `${modulE.toUpperCase()}-MODULE`];
      lectures
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach(({ lecture, date }, index) => {
          const [li, h4, button] = createElements('li', 'h4', 'button');
          const values = ['flex', `${lecture} - ${date.replace(/-/g, '/').replace('T', ' - ')}`, 'red', 'Del'];
          [li.className, h4.textContent, button.className, button.textContent] = values;
          button.addEventListener('click', () => {
            lectures.length === 1 ? delete modules[modulE] : lectures.splice(index, 1);
            render();
          });
          append(h4, li)(button)(li, ul);
        });
      append(h3, div)(ul)(div, modulesList);
    });
  };

  add.addEventListener('click', (event) => {
    event.preventDefault();
    const [lecture, date, modulE] = [nameIn, dateIn, selectIn].map((el) => el.value.trim());
    if (lecture && date && modulE !== 'Select module') {
      modules[modulE] ? modules[modulE].push({ lecture, date }) : (modules[modulE] = [{ lecture, date }]);
      form.reset();
      render();
    }
  });
}

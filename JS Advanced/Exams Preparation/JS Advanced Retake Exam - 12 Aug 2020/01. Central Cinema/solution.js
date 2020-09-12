solve = () => {
  const createElements = (...types) => types.map((type) => document.createElement(type));

  const append = (child, parent) => {
    parent.appendChild(child);
    return (nextChild, nextParent) => append(nextChild, nextParent || parent);
  };

  const elements = [...document.querySelectorAll('#container input'), ...document.querySelectorAll('ul')];
  const [imputName, inputHall, inputTicketPrice, moviesUL, archiveUL] = elements;

  document.getElementById('add-new').addEventListener('submit', (event) => {
    event.preventDefault();
    const [name, hall, ticketPrice] = [imputName, inputHall, inputTicketPrice].map((el) => el.value);
    if (![name, hall, ticketPrice].filter((value) => !value).length && !isNaN(ticketPrice)) {
      [imputName.value, inputHall.value, inputTicketPrice.value] = ['', '', ''];

      const elements = ['li', 'span', 'strong', 'div', 'strong', 'input', 'button'];
      const [liMov, span, strong1, div, strong2, input, button] = createElements(...elements);

      const values = [name, `Hall: ${hall}`, Number(ticketPrice).toFixed(2), 'Tickets Sold', 'Archive'];
      [span.textContent, strong1.textContent, strong2.textContent, input.placeholder, button.textContent] = values;

      append(liMov, moviesUL)(span, liMov)(strong1)(div)(strong2, div)(input)(button);

      button.addEventListener('click', () => {
        if (input.value && !isNaN(input.value)) {
          const totalPrice = (input.value * ticketPrice).toFixed(2);

          const [liArch, span, strong, button] = createElements('li', 'span', 'strong', 'button');
          [span.textContent, strong.textContent, button.textContent] = [name, `Total amount: ${totalPrice}`, 'Delete'];

          append(liArch, archiveUL)(span, liArch)(strong)(button);
          moviesUL.removeChild(liMov);

          button.addEventListener('click', () => archiveUL.removeChild(liArch));
        }
      });
    }
  });

  document.querySelector('#archive button').addEventListener('click', () => (archiveUL.innerHTML = ''));
};

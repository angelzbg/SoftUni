solve = () => {
  const createElements = (...types) => types.map((type) => document.createElement(type));
  const append = (child, parent) => {
    parent.appendChild(child);
    return (nextChild, nextParent) => append(nextChild, nextParent || parent);
  };

  const elements = document.querySelectorAll('input, button, ul');
  const [nameIn, hallIn, priceIn, add, ulScreen, ulArchive, clear] = elements;

  add.addEventListener('click', (event) => {
    event.preventDefault();
    const [name, hall, price] = [nameIn, hallIn, priceIn].map((el) => el.value.trim());
    if ([name, hall, price].findIndex((value) => !value) === -1 && !isNaN(price)) {
      [nameIn, hallIn, priceIn].forEach((el) => (el.value = ''));

      const elements = createElements('li', 'span', 'strong', 'div', 'strong', 'input', 'button');
      const [li, spanName, strongHall, div, strongPrice, inputTickets, buttonArchive] = elements;

      const texts = [name, `Hall: ${hall}`, (+price).toFixed(2), 'Archive'];
      [spanName, strongHall, strongPrice, buttonArchive].forEach((el, i) => (el.textContent = texts[i]));
      inputTickets.placeholder = 'Tickets Sold';

      append(spanName, li)(strongHall)(div)(strongPrice, div)(inputTickets)(buttonArchive)(li, ulScreen);

      buttonArchive.addEventListener('click', () => {
        const tickets = inputTickets.value.trim();
        if (tickets && !isNaN(tickets)) {
          li.removeChild(div);
          strongHall.textContent = `Total amount: ${(+price * tickets).toFixed(2)}`;
          const [deleteButton] = createElements('button');
          deleteButton.textContent = 'Delete';
          append(li, ulArchive)(deleteButton, li);
          deleteButton.addEventListener('click', () => li.parentElement.removeChild(li));
        }
      });
    }
  });

  clear.addEventListener('click', () => (ulArchive.innerHTML = ''));
};

solve = () => {
  const createElements = (...types) => types.map((type) => document.createElement(type));
  const append = (child, parent) => {
    parent.appendChild(child);
    return (nextChild, nextParent) => append(nextChild, nextParent || parent);
  };

  const [nameIn, ageIn, kindIn, ownerIn, adoption, adopted] = [...document.querySelectorAll('#container input, ul')];
  document.getElementById('add').addEventListener('submit', (event) => {
    event.preventDefault();
    const [name, age, kind, owner] = [nameIn, ageIn, kindIn, ownerIn].map((el) => el.value);
    if ([name, kind, owner].findIndex((value) => !value) === -1 && !isNaN(age)) {
      [nameIn, ageIn, kindIn, ownerIn].forEach((el) => (el.value = ''));
      const elements = createElements('li', 'p', 'span', 'button');
      const [li, p, span, button] = elements;
      p.innerHTML = `<strong>${name}</strong> is a <strong>${+age}</strong> year old <strong>${kind}</strong>`;
      [span.textContent, button.textContent] = [`Owner: ${owner}`, 'Contact with owner'];
      append(p, li)(span)(button)(li, adoption);

      button.addEventListener('click', () => {
        const [div, input, buttonTake] = createElements('div', 'input', 'button');
        [input.placeholder, buttonTake.textContent] = ['Enter your names', 'Yes! I take it!'];
        li.removeChild(button);
        append(input, div)(buttonTake)(div, li);

        buttonTake.addEventListener('click', () => {
          const newOwner = input.value;
          if (newOwner) {
            span.textContent = `New Owner: ${newOwner}`;
            li.removeChild(div);

            const [buttonCheck] = createElements('button');
            buttonCheck.textContent = 'Checked';
            append(buttonCheck, li)(li, adopted);
            buttonCheck.addEventListener('click', () => adopted.removeChild(li));
          }
        });
      });
    }
  });
};

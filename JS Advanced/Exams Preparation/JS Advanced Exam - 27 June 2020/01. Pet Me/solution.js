solve = () => {
  const createElements = (...types) => types.map((type) => document.createElement(type));
  const append = (child, parent) => {
    parent.appendChild(child);
    return (nextChild, nextParent) => append(nextChild, nextParent || parent);
  };

  const [nameIn, ageIn, kindIn, ownerIn, adoption, adopted] = [...document.querySelectorAll('input, ul')];
  document.getElementById('add').addEventListener('submit', (event) => {
    event.preventDefault();
    const [name, age, kind, owner] = [nameIn, ageIn, kindIn, ownerIn].map((el) => el.value.trim());
    if ([name, age, kind, owner].findIndex((value) => !value) === -1 && !isNaN(age)) {
      [nameIn, ageIn, kindIn, ownerIn].forEach((el) => (el.value = ''));
      const elements = createElements('li', 'p', 'span', 'button');
      const [li, p, span, buttonContact] = elements;
      p.innerHTML = `<strong>${name}</strong> is a <strong>${age}</strong> year old <strong>${kind}</strong>`;
      const texts = [`Owner: ${owner}`, 'Contact with owner'];
      [span, buttonContact].forEach((el, i) => (el.textContent = texts[i]));
      append(p, li)(span)(buttonContact)(li, adoption);
      buttonContact.addEventListener('click', () => {
        li.removeChild(buttonContact);
        const [div, input, button] = createElements('div', 'input', 'button');
        input.placeholder = 'Enter your names';
        button.textContent = 'Yes! I take it!';
        append(div, li)(input, div)(button);
        button.addEventListener('click', () => {
          if (input.value) {
            li.removeChild(div);
            const [buttonCheck] = createElements('button');
            buttonCheck.textContent = 'Checked';
            span.textContent = `New Owner: ${input.value}`;
            append(buttonCheck, li)(li, adopted);
            buttonCheck.addEventListener('click', () => li.parentElement.removeChild(li));
          }
        });
      });
    }
  });
};

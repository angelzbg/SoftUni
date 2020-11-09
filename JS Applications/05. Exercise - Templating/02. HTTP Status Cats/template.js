(() => {
  const hbs = document.getElementById('cat-template').innerHTML;
  const section = document.getElementById('allCats');
  const compiled = Handlebars.compile(hbs);
  const template = compiled({ cats });
  section.innerHTML = template;

  [...section.querySelectorAll('button')].forEach((button) => {
    const $info = button.parentElement.children[1];
    button.addEventListener('click', () => {
      if (button.textContent === 'Show status code') {
        button.textContent = 'Hide status code';
        $info.style.display = 'block';
      } else {
        button.textContent = 'Show status code';
        $info.style.display = 'none';
      }
    });
  });
})();

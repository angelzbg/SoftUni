(async () => {
  const hbs = document.getElementById('towns-template').innerHTML;
  const root = document.getElementById('root');

  const setTowns = (towns = []) => {
    if (!towns.length) {
      root.innerHTML = '';
      return;
    }

    const compiled = Handlebars.compile(hbs);
    const template = compiled({ towns });
    root.innerHTML = template;
  };

  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();

    const towns = event.target[0].value
      .split(',')
      .map((t) => t.trim())
      .filter((t) => !!t);
    setTowns(towns);
  });
})();

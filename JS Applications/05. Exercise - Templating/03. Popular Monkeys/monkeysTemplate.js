document.addEventListener('DOMContentLoaded', () => {
  const hbs = document.getElementById('monkey-template').innerHTML;
  const $monkeys = document.querySelector('.monkeys');
  const compiled = Handlebars.compile(hbs);
  const template = compiled({ monkeys });
  $monkeys.innerHTML = template;

  [...$monkeys.querySelectorAll('button')].forEach((button) => {
    const $info = button.parentElement.children[3];
    button.addEventListener('click', () => {
      $info.style.display = $info.style.display === 'none' ? 'block' : 'none';
    });
  });
});

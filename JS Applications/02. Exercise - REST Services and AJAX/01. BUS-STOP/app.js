function getInfo() {
  const [input, div, ul] = document.querySelectorAll('#result *, input#stopId');

  div.textContent = '';
  ul.innerHTML = '';
  fetch(`https://judgetests.firebaseio.com/businfo/${input.value}.json`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res.statusText);
    })
    .then(({ name, buses }) => {
      div.textContent = name;
      ul.innerHTML = Object.entries(buses)
        .map(([busId, time]) => `<li>Bus ${busId} arrives in ${time}</li>`)
        .join('');
      input.value = '';
    })
    .catch(() => ([div.textContent, ul.textContent] = ['Error', '']));
}

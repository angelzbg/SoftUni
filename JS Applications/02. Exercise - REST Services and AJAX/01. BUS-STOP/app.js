function getInfo() {
  const [div, ul] = document.querySelectorAll('#result *');

  fetch(`http://localhost:8000/businfo/${document.getElementById('stopId').value}`)
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
    })
    .catch(() => ([div.textContent, ul.textContent] = ['Error', '']));
}

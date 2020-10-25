((phonebook = {}, url = 'http://localhost:8000/phonebook') => {
  const toJson = (res) => {
    return res.ok
      ? res.json()
      : (function () {
          throw new Error(res.statusText);
        })();
  };

  const list = document.getElementById('phonebook');

  const render = () => {
    list.innerHTML = Object.entries(phonebook)
      .map(([uuid, { person, phone }]) => `<li id="${uuid}">${person}: ${phone}<button>Delete</button></li>`)
      .join('');
  };

  const loadData = () => {
    fetch(url)
      .then(toJson)
      .then((res) => render((phonebook = res)))
      .catch((e) => console.error(e.message));
  };

  const addRecord = (data = {}) => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    })
      .then(() => {
        loadData();
        [...document.querySelectorAll('input')].forEach((el) => (el.value = ''));
      })
      .catch((e) => console.error(e.message));
  };

  const deleteRecord = (uuid = '') => {
    fetch(`${url}/${uuid}`, { method: 'DELETE' })
      .then(loadData)
      .catch((e) => console.error(e.message));
  };

  document.getElementById('btnLoad').addEventListener('click', loadData);

  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      deleteRecord(e.target.parentElement.id);
    }
  });

  document.getElementById('btnCreate').addEventListener('click', () => {
    const [person, phone] = [...document.querySelectorAll('input')].map((el) => el.value);
    if (person && phone) {
      addRecord({ person, phone });
    }
  });
})();

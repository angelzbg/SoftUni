((phonebook = {}, url = 'https://phonebook-nakov.firebaseio.com/phonebook') => {
  const toJson = (res) => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(res.statusText);
  };

  const list = document.getElementById('phonebook');

  const render = () => {
    list.innerHTML = Object.entries(phonebook)
      .map(([uuid, { person, phone }]) => `<li id="${uuid}">${person}: ${phone}<button>Delete</button></li>`)
      .join('');
  };

  const loadData = () => {
    fetch(url + '.json')
      .then(toJson)
      .then((res) => {
        phonebook = res || {};
        render();
      })
      .catch((e) => console.error(e.message));
  };

  const addRecord = (data = {}) => {
    fetch(url + '.json', {
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
    fetch(`${url}/${uuid}.json`, { method: 'DELETE' })
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

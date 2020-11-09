(() => {
  const elements = document.querySelectorAll('#catches, aside > button, #addForm > input');
  const [catches, loadBtn, ...inputs] = elements;

  const notify = (() => {
    const container = document.createElement('div');
    container.style = 'position: fixed; width: 100%; bottom: 0; left: 0; text-align: center;';
    document.querySelector('body').appendChild(container);

    return (message = '', isError = true) => {
      const notification = document.createElement('span');
      notification.textContent = message;
      notification.style = `display: block;
      color: ${isError ? '#cc3300' : '#33cc33'};
      padding: 3px 15px 5px 15px;
      background: #ffffff;
      border: 1px solid #000000;
      margin: 0 auto;
      margin-bottom: 10px;
      width: fit-content;
      font-size: 14px;
      text-align: center;
      text-shadow: 0.5px 0.5px 0px #000000;
      cursor: pointer;`;
      container.insertBefore(notification, container.firstChild);
      notification.addEventListener('click', () => {
        container.removeChild(notification);
        console[isError ? 'error' : 'log'](message);
      });
      setTimeout(() => (container.contains(notification) ? container.removeChild(notification) : null), 5000);
    };
  })();

  const api = (() => {
    const make = async (func, callback) => {
      let res;
      try {
        res = await func();
        if (typeof callback === 'function') {
          await callback(res);
        }
      } catch (error) {
        notify(error.message);
      }

      return res; // ako vuobshte na nqkoimu trqbva sled callback-a moje da si awaitne v async func
    };

    const request = async (options, endpoint = '') => {
      const res = await fetch(`https://fisher-game.firebaseio.com/catches/${endpoint}.json`, options);
      if (res.ok) {
        return res.json();
      }

      throw new Error(`${options.method}: ${res.statusText}`);
    };

    return {
      get: (callback) => make(() => request({ method: 'GET' }), callback),
      create: (data, callback) => make(() => request({ method: 'POST', body: data }), callback),
      // PATCH bi bilo udachno, no mnogo potrebiteli clickat na edni i sushti neshta, zaradi tova PUT s celiq obekt
      update: (data, id, callback) => make(() => request({ method: 'PUT', body: data }, id), callback),
      delete: (id, callback) => make(() => request({ method: 'DELETE' }, id), callback),
    };
  })();

  const setLoadedData = (data) => {
    catches.innerHTML = Object.entries(data || {})
      .map(([id, { angler = '', weight = '', species = '', location = '', bait = '', captureTime = '' }]) => {
        return `<div class="catch" data-id="${id}">
            <label>Angler</label>
            <input type="text" class="angler" value="${angler}">
            <hr>
            <label>Weight</label>      
            <input type="number" class="weight" value="${weight}">
            <hr>
            <label>Species</label>
            <input type="text" class="species" value="${species}">
            <hr>
            <label>Location</label>
            <input type="text" class="location" value="${location}">
            <hr>
            <label>Bait</label>
            <input type="text" class="bait" value="${bait}">
            <hr>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${captureTime}">
            <hr>
            <button class="update">Update</button>
            <button class="delete">Delete</button>
        </div>`;
      })
      .join('');
  };

  const loadData = () => api.get(setLoadedData);

  const createData = (data) => {
    api.create(JSON.stringify(data), ({ name }) => {
      notify(`Successfully created entry with id: ${name}`, false);
      inputs.forEach((el) => (el.value = ''));
      loadData();
    });
  };

  const updateData = (data, id) => {
    api.update(JSON.stringify(data), id, () => {
      notify(`Successfully updated entry with id: ${id}`, false);
      loadData();
    });
  };

  const deleteData = (id) => {
    api.delete(id, () => {
      notify(`Successfully deleted entry with id: ${id}`, false);
      loadData();
    });
  };

  catches.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
      const id = target.parentElement.getAttribute('data-id');
      if (target.textContent === 'Update') {
        const inputs = [...target.parentElement.querySelectorAll('input')];
        const [angler, weight, species, location, bait, captureTime] = inputs.map((el) => el.value.trim());
        if ([angler, weight, species, location, bait, captureTime].findIndex((val) => !val) !== -1) {
          return notify(`Please fill all fields in the form in order to update entry ${id}`);
        }

        updateData({ angler, weight, species, location, bait, captureTime }, id);
      } else if (target.textContent === 'Delete') {
        deleteData(id);
      }
    }
  });

  loadBtn.addEventListener('click', () => loadData());

  document.querySelector('#addForm > button').addEventListener('click', () => {
    const [angler, weight, species, location, bait, captureTime] = inputs.map((el) => el.value.trim());
    if ([angler, weight, species, location, bait, captureTime].findIndex((val) => !val) !== -1) {
      return notify(`Please fill all fields in the form in order to create a new entry`);
    }

    createData({ angler, weight, species, location, bait, captureTime });
  });

  loadBtn.click();
})();

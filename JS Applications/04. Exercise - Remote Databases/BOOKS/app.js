window.onload = (data = []) => {
  const pageElements = document.querySelectorAll('body, table, tbody, #loadBooks, #addBooks, #formAdd');
  const [body, loadBooksBtn, table, tbody, addBookBtn, formAdd] = pageElements;

  const notify = (() => {
    const container = document.getElementById('notifications');

    return (message = '', isError = true) => {
      const notification = document.createElement('span');
      notification.textContent = message;
      notification.className = 'notification';
      notification.style.color = isError ? '#cc3300' : '#33cc33';

      container.insertBefore(notification, container.firstChild);
      notification.addEventListener('click', () => {
        container.removeChild(notification);
        console[isError ? 'error' : 'log'](message);
      });
      setTimeout(() => (container.contains(notification) ? container.removeChild(notification) : null), 5000);
    };
  })();

  const api = (() => {
    firebase.initializeApp({
      apiKey: 'AIzaSyArCeRiqYCVK8VIS2bMSoEfgQUUWl56eSc',
      authDomain: 'remote-database-exercise.firebaseapp.com',
      databaseURL: 'https://remote-database-exercise.firebaseio.com',
      projectId: 'remote-database-exercise',
      storageBucket: 'remote-database-exercise.appspot.com',
      messagingSenderId: '947659606593',
      appId: '1:947659606593:web:ce27190486b6f16dded4c0',
      measurementId: 'G-WB7314X86J',
    });

    const firestore = firebase.firestore().collection('books');

    const withCallBack = async (func, operation, callback) => {
      let res;
      try {
        res = await func();
        if (typeof callback === 'function') {
          callback(res);
        }
      } catch (error) {
        if (operation === 'update') {
          notify("This book doesn't exist anymore.");
        } else {
          notify(error.message);
        }
      }
    };

    return {
      get: (callback) => withCallBack(() => firestore.get(), 'get', callback),
      create: (book, callback) => withCallBack(() => firestore.add(book), 'create', callback),
      update: (id, book, callback) => withCallBack(() => firestore.doc(id).update(book), 'update', callback),
      delete: (id, callback) => withCallBack(() => firestore.doc(id).delete(), 'delete', callback),
    };
  })();

  addBookBtn.textContent = 'ADD BOOK ↓';
  addBookBtn.addEventListener('click', (event) => {
    event.preventDefault();
    formAdd.style.display = formAdd.style.display === 'none' ? 'block' : 'none';
    addBookBtn.textContent = formAdd.style.display === 'none' ? 'ADD BOOK ↓' : 'ADD BOOK ↑';
    formAdd.reset();
    if (formAdd.style.display === 'block') {
      window.scroll({ top: body.clientHeight, behavior: 'smooth' });
    }
  });

  const setBooks = ({ docs }) => {
    data = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    tbody.innerHTML = data
      .map(({ id, author, title, isbn }) => {
        return `<tr id="${id}"><td>${title}</td><td>${author}</td><td>${isbn}</td><td><button>Edit</button><button>Delete</button></td></tr>`;
      })
      .join('');
  };

  formAdd.addEventListener('submit', (event) => {
    event.preventDefault();
    const [title, author, isbn] = Array.from(formAdd)
      .slice(0, 3)
      .map((el) => el.value.trim());

    if ([title, author, isbn].findIndex((val) => !val) !== -1) {
      return notify('Please fill the whole form in order to add a book!');
    }

    api.create({ title, author, isbn }, () => {
      api.get(setBooks);
      formAdd.reset();
      addBookBtn.click();
    });
  });

  table.addEventListener('click', (event) => {
    const { target } = event;
    if (target.tagName === 'BUTTON') {
      const tr = target.parentElement.parentElement;
      const id = tr.id;
      const b = data.find((b) => b.id === id);

      const operation = target.textContent;
      if (operation === 'Edit') {
        tr.innerHTML = `<td><input type="text" value="${b.title}" maxlength="256" placeholder="Title..."/></td><td><input type="text" value="${b.author}" maxlength="256" placeholder="Author..."/></td><td><input type="text" value="${b.isbn}" maxlength="13" placeholder="ISBN..."/></td><td><button>Save</button><button>Cancel</button></td>`;
      } else if (operation === 'Delete') {
        api.delete(id, () => {
          notify(`Sucessfully deleted ${b.title} from ${b.author}`, false);
          api.get(setBooks);
        });
      } else if (operation === 'Save') {
        const [title, author, isbn] = [...tr.querySelectorAll('input')].map((el) => el.value.trim());
        if ([title, author, isbn].findIndex((val) => !val) !== -1) {
          return notify('Please fill the whole form in order to update the book!');
        }

        const updated = Object.fromEntries(
          Object.entries({ title, author, isbn }).filter(([key, value]) => value !== b[key])
        );

        api.update(id, updated, () => {
          notify('Successfully updated book!', false);
          api.get(setBooks);
        });
      } else {
        tr.innerHTML = `<td>${b.title}</td><td>${b.author}</td><td>${b.isbn}</td><td><button>Edit</button><button>Delete</button></td>`;
      }
    }
  });

  loadBooksBtn.addEventListener('click', () => api.get(setBooks));

  loadBooksBtn.click();
};

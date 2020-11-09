window.onload = () => {
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

    const firestore = firebase.firestore().collection('students');

    const withCallBack = async (func, callback) => {
      let res;
      try {
        res = await func();
        if (typeof callback === 'function') {
          callback(res);
        }
      } catch (error) {
        console.error(error);
      }
    };

    return {
      get: (callback) => withCallBack(() => firestore.orderBy('ID').get(), callback),
      create: (student, callback) => withCallBack(() => firestore.add(student), callback),
    };
  })();

  const load = () =>
    api.get(
      ({ docs }) =>
        (document.querySelector('body > table > tbody').innerHTML = docs
          .map((doc) => doc.data())
          .map(
            ({ ID, FirstName, LastName, FacultyNumber, Grade }) =>
              `<tr><td>${ID}</td><td>${FirstName}</td><td>${LastName}</td><td>${FacultyNumber}</td><td>${Grade}</td></tr>`
          )
          .join(''))
    );

  const getInt = (str) => {
    if (!isNaN(str) && Number.isInteger(parseFloat(str))) {
      return parseInt(str);
    } else {
      throw new Error(`"${str}" is not Integer`);
    }
  };

  const validateNumber = (str) => /^\d+$/.test(str);

  const getFloat = (str) => {
    if (!isNaN(str)) {
      return parseFloat(str);
    } else {
      throw new Error(`"${str}" is not a Number`);
    }
  };

  const [idIn, fnIn, lnIn, numIn, grIn] = [...document.querySelectorAll('input')];

  idIn.addEventListener('keyup', (event) => {
    const current = event.target.value.trim();
    if (isNaN(current)) {
      event.target.value = '';
    } else if (Number(current) < 0) {
      event.target.value = '';
    } else if (Number(current) > 1000000) {
      event.target.value = 1000000;
    }

    event.target.value = event.target.value.trim();
  });

  grIn.addEventListener('keyup', (event) => {
    const current = event.target.value.trim();
    if (isNaN(current)) {
      event.target.value = '';
    } else {
      if (Number(current) < 2 && current !== '') {
        event.target.value = 2;
      } else if (Number(current) > 6) {
        event.target.value = 6;
      }
    }

    event.target.value = event.target.value.trim();
  });

  document.getElementById('formAdd').addEventListener('submit', (event) => {
    event.preventDefault();
    let [ID, FirstName, LastName, FacultyNumber, Grade] = [idIn, fnIn, lnIn, numIn, grIn].map((el) => el.value.trim());

    if ([ID, FirstName, LastName, FacultyNumber, Grade].findIndex((val) => !val) !== -1) {
      return console.error('Missing inputs');
    }

    try {
      ID = getInt(ID);
    } catch (e) {
      return console.error(e);
    }

    if (!validateNumber(FacultyNumber)) {
      return console.error('Faculty Number must be a string of numbers');
    }

    try {
      Grade = getFloat(Grade);
    } catch (e) {
      return console.error(e);
    }

    api.create({ ID, FirstName, LastName, FacultyNumber, Grade }, () => {
      load();
      event.target.reset();
    });
  });

  load();
};

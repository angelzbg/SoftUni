window.onload = () => {
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

    const auth = firebase.auth();

    const isValidEmail = (emailString) =>
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        emailString
      );

    const createUserWithEmailAndPassword = (email, password, confirmPassword) => {
      if (!isValidEmail(email)) {
        return notify('Email address is not in a valid format!');
      }

      if (password.length < 6) {
        return notify('Password must be at least 6 characters long!');
      }

      if (confirmPassword !== password) {
        return notify("Passwords don't match!");
      }

      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          notify('Successful registration!', false);
        })
        .catch((error) => {
          notify(error.message);
        });
    };

    const signInWithEmailAndPassword = (email, password) => {
      if (!isValidEmail(email)) {
        return notify('Email address is not in a valid format!');
      }

      if (!password.length) {
        return notify('Please enter a password!');
      }

      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          notify('Logged in successfully', false);
        })
        .catch((error) => {
          notify(error.message);
        });
    };

    const signOut = () => {
      auth
        .signOut()
        .then(() => {
          notify('Successful logout', false);
        })
        .catch((error) => {
          notify(error.message);
        });
    };

    return { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
  })();

  const [loginForm, registerForm, logoutForm, welcome] = [
    'loginForm',
    'registerForm',
    'logoutForm',
    'welcome',
  ].map((id) => document.getElementById(id));

  const showUI = (part) => {
    [loginForm, registerForm, logoutForm].forEach((form) => {
      form.reset();
      form.style.display = 'none';
    });

    if (part === 'login') {
      loginForm.style.display = 'block';
    } else if (part === 'register') {
      registerForm.style.display = 'block';
    } else {
      logoutForm.style.display = 'block';
    }
  };

  api.auth.onAuthStateChanged((user) => {
    if (user) {
      welcome.textContent = `Welcome, ${user.email}`;
      showUI();
    } else {
      showUI('login');
    }
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.submitter.className === 'switch') {
      showUI('register');
    } else {
      api.signInWithEmailAndPassword(event.target.children[0].value, event.target.children[2].value);
    }
  });

  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.submitter.className === 'switch') {
      showUI('login');
    } else {
      api.createUserWithEmailAndPassword(
        event.target.children[0].value,
        event.target.children[2].value,
        event.target.children[4].value
      );
    }
  });

  logoutForm.addEventListener('submit', (event) => {
    event.preventDefault();
    api.signOut();
  });
};

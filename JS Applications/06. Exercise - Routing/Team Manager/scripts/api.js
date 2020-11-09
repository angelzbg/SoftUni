import events from './events.js';
import { emailToUsername, usernameToEmail, notify } from './utils.js';

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

const database = firebase.database();
const auth = firebase.auth();

const register = (username, password, confirmPassword) => {
  if (!username.length) {
    return notify('Please enter username!');
  }

  if (password.length < 6) {
    return notify('Password must be at least 6 characters long!');
  }

  if (confirmPassword !== password) {
    return notify("Passwords don't match!");
  }

  auth
    .createUserWithEmailAndPassword(usernameToEmail(username), password)
    .then(() => notify('Successful registration!', false))
    .catch((error) => notify(error.message));
};

const logIn = (username, password) => {
  if (!username.length) {
    return notify('Please enter username!');
  }

  if (!password.length) {
    return notify('Please enter password!');
  }

  auth
    .signInWithEmailAndPassword(usernameToEmail(username), password)
    .then(() => notify('Logged in successfully', false))
    .catch((error) => notify(error.message));
};

let userUID;
const listenerFunc = (snapshot) => {
  let team = undefined;
  if (snapshot.exists()) {
    team = snapshot.val().team;
  }

  events.trigger('userTeamChanged', team);
};

const listenUserTeam = (user) => {
  userUID = user.uid;
  database.ref(`members/${userUID}`).on('value', listenerFunc);
};

const unlistenUserTeam = () => database.ref(`members/${userUID}`).off('value', listenerFunc);

const logOut = () => {
  unlistenUserTeam();
  auth
    .signOut()
    .then(() => notify('Successful logout', false))
    .catch((error) => notify(error.message));
};

const joinTeam = (user, uuid, redirect) =>
  database.ref(`members/${user.uid}`).set({ username: user.email, team: uuid }, (error) => {
    if (error) {
      notify(error);
    } else {
      notify('Successfully joined team!', false);
      if (redirect) {
        window.location.hash = redirect;
      }
    }
  });

const leaveTeam = (user) =>
  database
    .ref(`members/${user.uid}`)
    .remove()
    .then(() => notify('Successfully left team!', false))
    .catch((error) => notify(error));

export { auth, database, logIn, logOut, register, listenUserTeam, joinTeam, leaveTeam };

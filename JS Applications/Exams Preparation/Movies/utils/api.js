import { isValidEmail } from './utils.js';
import { routes, notificationTypes, firebaseConfig } from './constants.js';
import { goToRoute } from './router.js';
import events from '../utils/events.js';

class API {
  constructor() {
    if (!!API.instance) {
      return API.instance;
    }

    API.instance = this;

    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore().collection('movies');

    this.isLoading = true;
    this.movies = [];

    return this;
  }

  _onSnapshot;
  dataListener = (user) => {
    if (user) {
      this._onSnapshot = this.firestore.orderBy('timestamp', 'desc').onSnapshot(({ docs }) => {
        this.isLoading = false;
        this.movies = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        events.trigger('dataChange', true);
      });
    } else {
      if (this._onSnapshot) {
        this._onSnapshot();
      }
      this.isLoading = true;
      this.movies = [];
    }
  };

  get user() {
    return this.auth.currentUser;
  }

  notify = (message, type, timeout) => events.trigger('notification', { message, type, timeout });

  createUserWithEmailAndPassword = (email, password, confirmPassword) => {
    if (!isValidEmail(email)) {
      return this.notify('Email address is not in a valid format!');
    }

    if (password.length < 6) {
      return this.notify('Password must be at least 6 characters long!');
    }

    if (confirmPassword !== password) {
      return this.notify("Passwords don't match!");
    }

    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.notify('Successful registration!', notificationTypes.SUCCESS);
      })
      .catch((error) => {
        this.notify(error.message);
      });
  };

  signInWithEmailAndPassword = (email, password) => {
    if (!isValidEmail(email)) {
      return this.notify('Email address is not in a valid format!');
    }

    if (!password.length) {
      return this.notify('Please enter a password!');
    }

    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.notify('Logged in successfully', notificationTypes.SUCCESS);
      })
      .catch((error) => {
        this.notify(error.message);
      });
  };

  signOut = () => {
    this.auth
      .signOut()
      .then(() => {
        this.notify('Successful logout', notificationTypes.SUCCESS);
      })
      .catch((error) => {
        this.notify(error.message);
      });
  };

  create = (name, description, image) => {
    if ([name, description, image].filter((value) => !value).length) {
      return this.notify('Invalid inputs!');
    }

    const { uid, email } = this.user;
    this.firestore
      .add({
        name,
        description,
        image,
        creator: { uid, email },
        users: {},
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        this.notify('Created successfully', notificationTypes.SUCCESS);
        goToRoute([routes.HOME]);
      })
      .catch((error) => {
        this.notify(error.message);
      });
  };

  edit = (name, description, image, movie) => {
    if ([name, description, image].filter((value) => !value).length) {
      return this.notify('Invalid inputs!');
    }

    const entries = Object.entries({ name, description, image }).filter(([field, value]) => value !== movie[field]);

    if (!entries.length) {
      this.notify('Eddited successfully', notificationTypes.SUCCESS);
      return goToRoute([routes.DETAILS, movie.id]);
    }

    this.firestore
      .doc(movie.id)
      .update(Object.fromEntries(entries))
      .then(() => {
        this.notify('Eddited successfully', notificationTypes.SUCCESS);
        goToRoute([routes.DETAILS, movie.id]);
      })
      .catch((error) => {
        this.notify(error.message);
      });
  };

  delete = (id) => {
    this.firestore
      .doc(id)
      .delete()
      .then(() => {
        this.notify('Deleted successfully', notificationTypes.SUCCESS);
        goToRoute([routes.HOME]);
      })
      .catch((error) => {
        this.notify(error.message);
      });
  };

  like = (id) => {
    const { uid, email } = this.user;

    this.firestore
      .doc(id)
      .set({ users: { [uid]: email } }, { merge: true })
      .then(() => {
        this.notify('Liked successfully', notificationTypes.SUCCESS);
      })
      .catch((error) => {
        this.notify(error.message);
      });
  };
}

const api = new API();
export default api;

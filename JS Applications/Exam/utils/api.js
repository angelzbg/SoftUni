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
    this.firestore = firebase.firestore().collection('destinations');

    this.isLoading = true;
    this.destinations = [];

    return this;
  }

  _onSnapshot;
  dataListener = (user) => {
    if (user) {
      this._onSnapshot = this.firestore.onSnapshot(({ docs }) => {
        this.isLoading = false;
        this.destinations = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        events.trigger('dataChange', true);
      });
    } else {
      if (this._onSnapshot) {
        this._onSnapshot();
      }
      this.isLoading = true;
      this.destinations = [];
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

    events.trigger('loading', true);
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.notify('User registration successful.', notificationTypes.SUCCESS);
      })
      .catch((error) => {
        this.notify(error.message);
      })
      .finally(() => events.trigger('loading', false));
  };

  signInWithEmailAndPassword = (email, password) => {
    if (!isValidEmail(email)) {
      return this.notify('Email address is not in a valid format!');
    }

    if (!password.length) {
      return this.notify('Please enter a password!');
    }

    events.trigger('loading', true);
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.notify('Login successful.', notificationTypes.SUCCESS);
      })
      .catch((error) => {
        this.notify(error.message);
      })
      .finally(() => events.trigger('loading', false));
  };

  signOut = () => {
    events.trigger('loading', true);
    this.auth
      .signOut()
      .then(() => {
        this.notify('Logout successful.', notificationTypes.SUCCESS);
      })
      .catch((error) => {
        this.notify(error.message);
      })
      .finally(() => events.trigger('loading', false));
  };

  _validateInputs = (name, city, duration, departure, imageUrl) => {
    if (!name.length) {
      return this.notify("Destination name can't be empty!");
    }

    if (!city.length) {
      return this.notify("City destination can't be empty!");
    }

    try {
      duration = parseInt(duration);
    } catch (e) {
      return this.notify('Duration must be a number!');
    }

    if (duration < 1 || duration > 100) {
      return this.notify('Durationmust be between 1 and 100 days!');
    }

    if (!departure.length) {
      return this.notify("Departure date can't be empty!");
    }

    if (!imageUrl.length) {
      return this.notify('You must provide an image for the destination!');
    }

    return true;
  };

  create = (name, city, duration, departure, imageUrl) => {
    if (!this._validateInputs(name, city, duration, departure, imageUrl)) {
      return;
    }

    events.trigger('loading', true);
    this.firestore
      .add({
        name,
        city,
        duration: +duration,
        departure,
        imageUrl,
        creator: this.user.uid,
      })
      .then(() => {
        this.notify(`Created successfully destination ${name} to ${city}`, notificationTypes.SUCCESS);
        goToRoute([routes.HOME]);
      })
      .catch((error) => {
        this.notify(error.message);
      })
      .finally(() => events.trigger('loading', false));
  };

  edit = (name, city, duration, departure, imageUrl, destination) => {
    if (!this._validateInputs(name, city, duration, departure, imageUrl)) {
      return;
    }

    const entries = Object.entries({ name, city, duration: +duration, departure, imageUrl }).filter(
      ([field, value]) => value !== destination[field]
    );

    if (!entries.length) {
      this.notify('Successfully edited destination.', notificationTypes.SUCCESS);
      return goToRoute([routes.DETAILS, destination.id]);
    }

    events.trigger('loading', true);
    this.firestore
      .doc(destination.id)
      .update(Object.fromEntries(entries))
      .then(() => {
        this.notify('Successfully edited destination.', notificationTypes.SUCCESS);
        goToRoute([routes.DETAILS, destination.id]);
      })
      .catch((error) => {
        this.notify(error.message);
      })
      .finally(() => events.trigger('loading', false));
  };

  delete = (id) => {
    events.trigger('loading', true);
    this.firestore
      .doc(id)
      .delete()
      .then(() => {
        this.notify('Destination deleted.', notificationTypes.SUCCESS);
      })
      .catch((error) => {
        this.notify(error.message);
      })
      .finally(() => events.trigger('loading', false));
  };
}

const api = new API();
export default api;

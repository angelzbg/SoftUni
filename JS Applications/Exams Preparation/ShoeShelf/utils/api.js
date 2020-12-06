import { isValidEmail } from './utils.js';
import { routes, firebaseConfig } from './constants.js';
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
    this.firestore = firebase.firestore().collection('shoes');

    this.isLoading = true;
    this.shoes = [];

    return this;
  }

  _onSnapshot;
  dataListener = (user) => {
    if (user) {
      this._onSnapshot = this.firestore.onSnapshot(({ docs }) => {
        this.isLoading = false;
        this.shoes = docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => Object.keys(b.people).length - Object.keys(a.people).length);
        events.trigger('dataChange', true);
      });
    } else {
      if (this._onSnapshot) {
        this._onSnapshot();
      }
      this.isLoading = true;
      this.shoes = [];
    }
  };

  get user() {
    return this.auth.currentUser;
  }

  createUserWithEmailAndPassword = (email, password, confirmPassword) => {
    if (!isValidEmail(email)) {
      return console.error('Email address is not in a valid format!');
    }

    if (password.length < 6) {
      return console.error('Password must be at least 6 characters long!');
    }

    if (confirmPassword !== password) {
      return console.error("Passwords don't match!");
    }

    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Successful registration!');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  signInWithEmailAndPassword = (email, password) => {
    if (!isValidEmail(email)) {
      return console.error('Email address is not in a valid format!');
    }

    if (!password.length) {
      return console.error('Please enter a password!');
    }

    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Logged in successfully');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  signOut = () => {
    this.auth
      .signOut()
      .then(() => {
        console.log('Successful logout');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  create = (name, price, imageUrl, description, brand) => {
    if ([name, price, imageUrl, description, brand].filter((value) => !value).length) {
      return console.error('Invalid inputs!');
    }

    const { uid, email } = this.user;
    this.firestore
      .add({
        name,
        price,
        imageUrl,
        description,
        brand,
        creator: { uid, email },
        people: {},
      })
      .then(() => {
        console.log('Created successfully');
        goToRoute([routes.HOME]);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  edit = (name, price, imageUrl, description, brand, shoe) => {
    if ([name, price, imageUrl, description, brand].filter((value) => !value).length) {
      return console.error('Invalid inputs!');
    }

    const entries = Object.entries({ name, price, imageUrl, description, brand }).filter(
      ([field, value]) => value !== shoe[field]
    );

    if (!entries.length) {
      console.log('Eddited successfully');
      return goToRoute([routes.DETAILS, shoe.id]);
    }

    this.firestore
      .doc(shoe.id)
      .update(Object.fromEntries(entries))
      .then(() => {
        console.log('Eddited successfully');
        goToRoute([routes.DETAILS, shoe.id]);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  delete = (id) => {
    this.firestore
      .doc(id)
      .delete()
      .then(() => {
        console.log('Deleted successfully');
        goToRoute([routes.HOME]);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  buy = (id) => {
    const { uid, email } = this.user;

    this.firestore
      .doc(id)
      .set({ people: { [uid]: email } }, { merge: true })
      .then(() => {
        console.log('Bought successfully');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
}

const api = new API();
export default api;

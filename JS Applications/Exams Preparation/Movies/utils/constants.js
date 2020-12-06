export const routes = {
  HOME: '',
  LOGIN: 'login',
  REGISTER: 'register',
  ADD: 'add',
  EDIT: 'edit',
  DETAILS: 'details',
};

export const authResRoutes = {
  true: [routes.LOGIN, routes.REGISTER],
  false: [routes.ADD, routes.DETAILS, routes.EDIT],
};

export const firebaseConfig = {
  apiKey: 'AIzaSyC5Uo3W6MWgdNzBqdDKqQ5HH_HcR9hZMJI',
  authDomain: 'exam-1-adaa0.firebaseapp.com',
  databaseURL: 'https://exam-1-adaa0.firebaseio.com',
  projectId: 'exam-1-adaa0',
  storageBucket: 'exam-1-adaa0.appspot.com',
  messagingSenderId: '366366329749',
  appId: '1:366366329749:web:5678d94475e2ac17e2449c',
};

export const notificationTypes = {
  SUCCESS: 1,
  ERROR: 2,
};

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
  apiKey: 'AIzaSyDhSLqAYzVLgSgJ1PRxiofmMj1PZQL6QMs',
  authDomain: 'exam-2-755f9.firebaseapp.com',
  databaseURL: 'https://exam-2-755f9.firebaseio.com',
  projectId: 'exam-2-755f9',
  storageBucket: 'exam-2-755f9.appspot.com',
  messagingSenderId: '1037327699855',
  appId: '1:1037327699855:web:8152b2aaac52727500c5fa',
};
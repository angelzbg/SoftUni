export const routes = {
  HOME: '',
  LOGIN: 'login',
  REGISTER: 'register',
  ADD: 'add',
  EDIT: 'edit',
  DETAILS: 'details',
  DESTINATIONS: 'destinations',
};

export const authResRoutes = {
  true: [routes.LOGIN, routes.REGISTER],
  false: [routes.ADD, routes.DETAILS, routes.EDIT, routes.DESTINATIONS],
};

export const firebaseConfig = {
  apiKey: 'AIzaSyCdKamDYXiQNLzSH5CCWPX39GzFsUTCNjE',
  authDomain: 'exam-applications.firebaseapp.com',
  databaseURL: 'https://exam-applications-default-rtdb.firebaseio.com',
  projectId: 'exam-applications',
  storageBucket: 'exam-applications.appspot.com',
  messagingSenderId: '939973041433',
  appId: '1:939973041433:web:eea4619bbb0f2eaf5a7988',
};

export const notificationTypes = {
  SUCCESS: 1,
  ERROR: 2,
};

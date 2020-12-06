import { routes, authResRoutes } from './utils/constants.js';
import AuthRouter from './utils/router.js';
import navigation from './components/navigation.js';
import notifications from './components/notifications.js';
import footer from './components/footer.js';
import home from './components/home.js';
import login from './components/login.js';
import register from './components/register.js';
import add from './components/add.js';
import edit from './components/edit.js';
import details from './components/details.js';

export default (() => {
  if (window.location.pathname !== '/') {
    [window.location.hash, window.location.pathname] = [`#${window.location.pathname}`, ''];
    return;
  }

  /*const withRouterCleanUp = */
  new AuthRouter({
    routes,
    home: routes.HOME,
    authResRoutes,
  }).withRouter(
    {
      parent: document.getElementById('container'),
      components: {
        before: [navigation, notifications],
        switch: {
          [routes.HOME]: home,
          [routes.LOGIN]: login,
          [routes.REGISTER]: register,
          [routes.ADD]: add,
          [routes.EDIT]: edit,
          [routes.DETAILS]: details,
        },
        after: [footer],
      },
    },
    true
  );
  // withRouterCleanUp();
})();

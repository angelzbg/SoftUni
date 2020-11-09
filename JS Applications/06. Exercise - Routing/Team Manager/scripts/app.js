import { database, auth, listenUserTeam } from './api.js';
import events from '../scripts/events.js';

import header from '../components/header.js';
import footer from '../components/footer.js';
import about from '../components/about.js';
import home from '../components/home.js';
import login from '../components/login.js';
import register from '../components/register.js';
import catalog from '../components/catalog/catalog.js';
import create from '../components/create.js';

(() => {
  let isListening = false;
  let isLoadingAuth = true;
  let user = null;
  let userTeam;

  const routes = {
    home: '',
    about: 'about',
    login: 'login',
    register: 'register',
    catalog: 'catalog',
    create: 'create',
  };

  const authResRoutes = [routes.catalog, routes.create];
  const nonAuthResRoutes = [routes.login, routes.register];

  let route;

  const routeCheck = () => {
    route = window.location.hash.split(/[#\/]/g).filter((s) => !!s);

    if (
      route[0] === undefined ||
      routes[route[0]] === undefined ||
      (!isLoadingAuth && !!user && nonAuthResRoutes.includes(route[0])) ||
      (!isLoadingAuth && !user && authResRoutes.includes(route[0]))
    ) {
      route = [routes.home];
      window.location.hash = `#/${route[0]}`;
    }

    events.trigger('routeCheck', { route, user });
  };

  routeCheck();

  window.addEventListener('hashchange', routeCheck);

  const main = document.getElementById('main');
  const container = document.createElement('div');
  container.className = 'container';
  const head = document.createElement('header');

  const components = {
    [routes.home]: home,
    [routes.about]: about,
    [routes.login]: login,
    [routes.register]: register,
    [routes.catalog]: catalog,
    [routes.create]: create,
  };

  let willUnmount;
  const switchComponent = () => {
    if (willUnmount) {
      willUnmount();
    }

    willUnmount = components[route[0]]({ parent: container, route, routes, user, userTeam });
  };

  const loadApp = () => {
    main.removeChild(main.firstChild);
    main.appendChild(container);
    container.appendChild(head);

    header({ parent: head, routes, user });
    switchComponent();
    footer({ parent: main });

    events.listen('routeCheck', 'app', switchComponent);
    events.listen('authChange', 'app', routeCheck);
    events.listen('userTeamChanged', 'app', (data) => {
      userTeam = data;
      routeCheck();
    });
  };

  auth.onAuthStateChanged((currentUser) => {
    user = currentUser;

    if (isLoadingAuth) {
      isLoadingAuth = false;
      loadApp();
    }

    if (user) {
      if (!isListening) {
        isListening = true;
        listenUserTeam(user);
      }
    } else {
      userTeam = undefined;
      isListening = false;
    }

    events.trigger('authChange', { user });
  });
})();

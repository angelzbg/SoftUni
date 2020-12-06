import events from './events.js';
import api from './api.js';
import { parseHTMLElement } from './utils.js';

export const getRoute = () => {
  const route = window.location.hash.split(/[#\/]/g).filter((el) => !!el);
  return !route.length ? [''] : route;
};

export const goToRoute = (params = []) => (window.location.hash = `#/${params.join('/')}`);

class AuthRouter {
  constructor({ routes, home, authResRoutes }) {
    if (!!AuthRouter.instance) {
      return AuthRouter.instance;
    }

    AuthRouter.instance = this;

    let initial = true;
    const checkAuthRoutes = () => {
      const user = api.user;
      let route = getRoute();

      if (
        !Object.values(routes).includes(route[0]) ||
        (authResRoutes && (authResRoutes[!!user] || []).includes(route[0]))
      ) {
        route = [home];
      }

      goToRoute(route);

      return { user, route };
    };

    window.addEventListener('hashchange', () => events.trigger('routeChange', checkAuthRoutes()));

    api.auth.onAuthStateChanged((user) => {
      api.dataListener(user);
      events.trigger('authChange', checkAuthRoutes());
      if (initial) {
        initial = false;
        events.trigger('render');
      }
    });

    return this;
  }

  getInsertElement = (parent, willUnmountBefore, willUnmountAfter) => {
    if (willUnmountBefore.length) {
      return (htmlString) => {
        const mainElement = parseHTMLElement(htmlString);
        willUnmountBefore[willUnmountBefore.length - 1].wrapper.after(mainElement);
        return mainElement;
      };
    } else if (willUnmountAfter.length) {
      return (htmlString) => {
        const mainElement = parseHTMLElement(htmlString);
        willUnmountAfter[0].wrapper.before(mainElement);
        return mainElement;
      };
    } else {
      return (htmlString) => {
        const mainElement = parseHTMLElement(htmlString);
        parent.appendChild(mainElement);
        return mainElement;
      };
    }
  };

  withRouter = ({ parent, components }, isInitial) => {
    const routerID = Math.random().toString(36).substr(2, 9);

    const cleanUp = ({ wrapper, cleanUp }) => {
      if (cleanUp) {
        cleanUp();
      }

      if (wrapper) {
        parent.removeChild(wrapper);
      }
    };

    let [willUnmountBefore, willUnmountAfter] = [[], []];
    let componentWillUnmount;

    const render = () => {
      events.unlisten('render', `componentSwitcher-${routerID}`);

      [willUnmountBefore, willUnmountAfter] = [
        (components.before || []).map((component) => component({ parent })),
        (components.after || []).map((component) => component({ parent })),
      ];

      const htmlToParent = this.getInsertElement(parent, willUnmountBefore, willUnmountAfter);

      const switchComponent = (route) =>
        (componentWillUnmount = components.switch[route[0]]({ parent, htmlToParent, route, routerID }));

      switchComponent(getRoute());

      events.listen('routeChange', `componentSwitcher-${routerID}`, ({ route }) => {
        cleanUp(componentWillUnmount);
        switchComponent(route);
      });
    };

    if (isInitial) {
      events.listen('render', `componentSwitcher-${routerID}`, render);
    } else {
      render();
    }

    return () => {
      events.unlisten('render', `componentSwitcher-${routerID}`);
      events.unlisten('routeChange', `componentSwitcher-${routerID}`);
      if (componentWillUnmount) {
        cleanUp(componentWillUnmount);
      }
      willUnmountBefore.concat(willUnmountAfter).forEach(cleanUp);
    };
  };
}

export default AuthRouter;

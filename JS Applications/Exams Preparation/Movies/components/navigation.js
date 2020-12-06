import { routes } from '../utils/constants.js';
import { parseHTMLElement, parseHTMLElements } from '../utils/utils.js';
import api from '../utils/api.js';
import events from '../utils/events.js';

export default ({ parent }) => {
  const wrapper = parent.appendChild(
    parseHTMLElement(
      `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand text-light" href="#/">Movies</a>
        <ul class="navbar-nav ml-auto"></ul>
      </nav>`
    )
  );

  const ul = wrapper.children[1];
  let partials = [];

  const render = ({ user, route }) => {
    partials.forEach((el) => ul.removeChild(el));
    partials.length = 0;

    if (user) {
      partials = parseHTMLElements(
        `<li class="nav-item">
          <a class="nav-link">Welcome, ${user.email}</a>
        </li>`,
        `<li class="nav-item">
          <a class="nav-link" href="#/${routes.HOME}">Logout</a>
        </li>`
      );

      partials[1].children[0].addEventListener('click', api.signOut);
    } else {
      partials = parseHTMLElements(
        `<li class="nav-item">
          <a class="nav-link" href="#/${routes.LOGIN}">Login</a>
        </li>`,
        `<li class="nav-item">
          <a class="nav-link" href="#/${routes.REGISTER}">Register</a>
        </li>`
      );
    }

    ul.append(...partials);
  };

  render({ user: api.user });
  events.listen('authChange', 'navigation', render);

  return {
    wrapper,
    cleanUp: () => events.unlisten('authChange', 'navigation'),
  };
};

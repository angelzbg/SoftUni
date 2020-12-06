import { routes } from '../utils/constants.js';
import { parseHTMLElement, parseHTMLElements } from '../utils/utils.js';
import api from '../utils/api.js';
import events from '../utils/events.js';

export default ({ parent }) => {
  const wrapper = parent.appendChild(parseHTMLElement(`<nav></nav>`));

  let partials = [];

  const render = ({ user }) => {
    partials.forEach((el) => wrapper.removeChild(el));
    partials.length = 0;

    if (user) {
      partials = parseHTMLElements(
        `<div class="left-container">
            <ul>
                <li><a href="#/${routes.HOME}">Home</a></li>
                <li><a href="#/${routes.DESTINATIONS}">Destinations</a></li>
                <li><a href="#/${routes.ADD}">Add +</a></li>
            </ul>
        </div>`,
        `<div class="right-container">
            <span>Welcome, ${user.email} |</span>
            <a href="#/${routes.HOME}" class="log-out">Logout</a>
        </div>`
      );

      partials[1].children[1].addEventListener('click', api.signOut);
    } else {
      partials = parseHTMLElements(
        `<div class="left-container">
            <ul>
                <li><a href="#/${routes.HOME}">Home</a></li>
                <li><a href="#/${routes.LOGIN}">Login</a></li>
                <li><a href="#/${routes.REGISTER}">Register</a></li>
            </ul>
        </div>`
      );
    }

    wrapper.append(...partials);
  };

  render({ user: api.user });
  events.listen('authChange', 'navigation', render);

  return {
    wrapper,
    cleanUp: () => events.unlisten('authChange', 'navigation'),
  };
};

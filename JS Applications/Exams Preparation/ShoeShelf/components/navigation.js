import { routes } from '../utils/constants.js';
import { parseHTMLElement, parseHTMLElements } from '../utils/utils.js';
import api from '../utils/api.js';
import events from '../utils/events.js';

export default ({ parent }) => {
  const wrapper = parseHTMLElement(`<header><nav><ul></ul></nav></header>`);
  parent.appendChild(wrapper);

  const ul = wrapper.children[0].children[0];
  let partials = [];

  const render = ({ user, route }) => {
    partials.forEach((el) => ul.removeChild(el));
    partials.length = 0;

    if (user) {
      partials = parseHTMLElements(
        `<li><a href="#/${routes.ADD}">Create new offer</a></li>`,
        `<li><a href="#/${routes.HOME}"><img src="../static/sneakers.png" alt=""></a></li>`,
        `<li>Welcome, ${user.email} | <a href="#/${routes.HOME}">Logout</a></li>`
      );

      partials[2].children[0].addEventListener('click', api.signOut);
    } else {
      partials = parseHTMLElements(
        `<li class="site-logo">Shoe</li>`,
        `<li><a href="#/${routes.HOME}"><img src="../static/sneakers.png" alt=""></a></li>`,
        `<li class="site-logo">Shelf</li>`
      );
    }

    ul.append(...partials);
  };

  render({ user: api.user });
  events.listen('authChange', 'navigation', render);

  return {
    wrapper,
    cleanUp: () => {
      events.unlisten('authChange', 'navigation');
    },
  };
};

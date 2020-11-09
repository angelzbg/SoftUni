import { parseHTMLElement, emailToUsername } from '../scripts/utils.js';
import events from '../scripts/events.js';
import { logOut } from '../scripts/api.js';

export default ({ parent, routes, user }) => {
  let unmount;

  const render = (user) => {
    const child = parseHTMLElement(
      `<div class="jumbotron">
            <h1>Team Manager</h1>
            ${user ? `<span>Welcome, ${emailToUsername(user.email)}</span>` : ''}
            <nav>
                <a href="#/" class="btn btn-default">Home</a>
                <a href="#/about" class="btn btn-default">About</a>
                ${
                  user
                    ? `<a href="#/${routes.catalog}" class="btn btn-default">Catalog</a> <a href="#/" class="btn btn-default">Logout</a>`
                    : `<a href="#/${routes.login}" class="btn btn-default">Login</a> <a href="#/${routes.register}" class="btn btn-default">Register</a>`
                }
            </nav>
        </div>`
    );

    if (unmount) {
      unmount();
    }

    parent.prepend(child);

    if (user) {
      const logout = child.querySelector('a:nth-child(4)');
      logout.addEventListener('click', (event) => {
        event.preventDefault();
        logOut();
      });
    }

    unmount = () => parent.removeChild(child);
  };

  render(user);

  events.listen('authChange', 'header', ({ user }) => render(user));
};

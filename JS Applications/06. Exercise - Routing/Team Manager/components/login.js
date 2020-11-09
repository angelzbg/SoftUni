import { parseHTMLElements } from '../scripts/utils.js';
import { logIn } from '../scripts/api.js';

export default ({ parent }) => {
  const children = parseHTMLElements(
    `<h1>Login Page</h1>`,
    `<form>
        <div class="form-group">
            <label for="username">Username:</label>
            <input class="form-control" type="text" id="username" name="username"/>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input class="form-control" type="password" id="password" name="password"/>
        </div>
        <input class="btn btn-default" type="submit" value="Login"/>
    </form>`
  );

  parent.append(...children);

  children[1].addEventListener('submit', (event) => {
    event.preventDefault();
    const [username, password] = [...event.target.querySelectorAll('input')].map((el) => el.value.trim());
    logIn(username, password);
  });

  return () => children.forEach((el) => parent.removeChild(el));
};

import api from '../utils/api.js';
import { routes } from '../utils/constants.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  const wrapper = htmlToParent(
    `<div>
      <h1>Login</h1>
      <p class="form-info">Don't have account?
          <a href="#/${routes.REGISTER}">Register now</a> and fix that!
      </p>
      <form>
        <div><input type="email" placeholder="Email..."></div>
        <div><input type="password" placeholder="Password..."></div>
        <div><button>Login</button></div>
      </form>
    </div>`
  );

  wrapper.children[2].addEventListener('submit', (event) => {
    event.preventDefault();
    api.signInWithEmailAndPassword(
      ...Array.from(event.target)
        .slice(0, 2)
        .map((input) => input.value)
    );
  });

  return {
    wrapper,
    cleanUp: () => {},
  };
};

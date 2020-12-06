import api from '../utils/api.js';
import { routes } from '../utils/constants.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  const wrapper = htmlToParent(
    `<div>
      <h1>Register</h1>
      <p class="form-info">Already registered?<a href="#/${routes.LOGIN}"> Login now</a> and have some fun!</p>
      <form>
        <div><input type="email" placeholder="Email..."></div>
        <div><input type="password" placeholder="Password"></div>
        <div><input type="password" placeholder="Re-password"></div>
        <div><button>Register</button></div>
      </form>
    </div>`
  );

  wrapper.children[2].addEventListener('submit', (event) => {
    event.preventDefault();
    api.createUserWithEmailAndPassword(
      ...Array.from(event.target)
        .slice(0, 3)
        .map((input) => input.value)
    );
  });

  return {
    wrapper,
    cleanUp: () => {},
  };
};

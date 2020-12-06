import api from '../utils/api.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  const wrapper = htmlToParent(
    `<form class="text-center border border-light p-5" action="" method="">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
    </form>`
  );

  wrapper.addEventListener('submit', (event) => {
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
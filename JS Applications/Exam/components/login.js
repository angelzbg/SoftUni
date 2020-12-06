import api from '../utils/api.js';

export default ({ htmlToParent }) => {
  const wrapper = htmlToParent(
    `<section id="viewLogin">
        <h2>Login to your account:</h2>
        <form id="formLogin">
            <label for="email">Email:</label>
            <input type="text" id="email" name="email" placeholder="Enter your Email">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your Password">
            <input type="submit" class="login" value="Login">
        </form>
    </section>`
  );

  wrapper.children[1].addEventListener('submit', (event) => {
    event.preventDefault();
    api.signInWithEmailAndPassword(
      ...Array.from(event.target)
        .slice(0, 2)
        .map((input) => input.value.trim())
    );
  });

  return { wrapper };
};

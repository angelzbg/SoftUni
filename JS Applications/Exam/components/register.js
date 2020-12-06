import api from '../utils/api.js';

export default ({ htmlToParent }) => {
  const wrapper = htmlToParent(
    `<section id="viewRegister">
        <h2>Create your account:</h2>
        <form id="formRegister">
            <label for="email">Email:</label>
            <input type="text" id="email" name="email" placeholder="Email">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Password">
            <label for="rePassword">Repeat Password:</label>
            <input type="password" id="rePassword" name="rePassword" placeholder="Repeat Password">
            <input type="submit" class="register" value="Register">
        </form>
    </section>`
  );

  wrapper.children[1].addEventListener('submit', (event) => {
    event.preventDefault();
    api.createUserWithEmailAndPassword(
      ...Array.from(event.target)
        .slice(0, 3)
        .map((input) => input.value.trim())
    );
  });

  return { wrapper };
};

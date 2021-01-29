const login = ({ user, data, error, path }) => {
  let username = (password = '');
  if (data) {
    ({ username, password } = data);
  }

  return `
    <section id="viewLogin">
      <h2>Login:</h2>
      <form id="formLogin" action="/login" method="POST">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="Enter your Username" value="${username}">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your Password" value="${password}">
        <input type="submit" class="login" value="Login">
      </form>
    </section>`;
};

module.exports = login;

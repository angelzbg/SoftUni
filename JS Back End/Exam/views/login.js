const login = ({ user, data, error, path }) => {
  let username = (password = '');
  if (data) {
    ({ username, password } = data);
  }

  return `
    <form action="/login" method="POST">
      <h1>Login</h1>

      <p>Personal info</p>
      <label for="usernmae">Username</label>
      <input id="username" name="username" type="text" placeholder="JustMyself123..." value="${username}" />

      <label for="usernmae">Password</label>
      <input id="password" name="password" type="password" placeholder="********" value="${password}" />

      <button type="submit">Login</button>
    </form>`;
};

module.exports = login;

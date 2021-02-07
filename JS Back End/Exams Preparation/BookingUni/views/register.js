const register = ({ user, data, error, path }) => {
  let email = (username = password = rePassword = '');
  if (data) {
    ({ email, username, password, rePassword } = data);
  }

  return `
    <section id="viewRegister">
      <h2>Create your account:</h2>
      <form id="formRegister" action="/register" method="POST">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" placeholder="Email" value="${email}">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="Enter your Username" value="${username}">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Password"  value="${password}">
        <label for="rePassword">Repeat Password:</label>
        <input type="password" id="rePassword" name="rePassword" placeholder="Repeat Password"  value="${rePassword}">
        <input type="submit" class="register" value="Register" onclick="showLoading(event)">
      </form>
    </section>`;
};

module.exports = register;

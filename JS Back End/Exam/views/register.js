const register = ({ user, data, error, path }) => {
  let username = (password = rePassword = amount = '');
  if (data) {
    ({ username, password, rePassword, amount } = data);
  }

  return `
  <form action="/register" method="POST">
    <h1>Register</h1>

    <p>Personal info</p>
    <label for="username">Username</label>
    <input id="username" name="username" type="text" placeholder="JustMyself123..." value="${username}"/>

    <label for="usernmae">Password</label>
    <input id="password" name="password" type="password" placeholder="******" value="${password}"/>

    <label for="rePassword">Repeat Password</label>
    <input id="rePassword" name="rePassword" type="password" placeholder="******" value="${rePassword}"/>
    <hr>
    <p>Account</p>
    <label for="amount">Amount</label>
    <input id="amount" name="amount" type="text" placeholder="$125.90" value="${amount}"/>

    <button type="submit">Register</button>
  </form>`;
};

module.exports = register;

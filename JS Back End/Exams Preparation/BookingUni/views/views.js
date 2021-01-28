const home = require('./home.js');
const login = require('./login.js');
const register = require('./register.js');
const add = require('./add.js');
const details = require('./details.js');
const edit = require('./edit.js');
const profile = require('./profile.js');

const components = { home, login, register, add, details, edit, profile };

const getPage = ({ componentName, user, data, error, info, loading, path = './' }) => {
  const component = components[componentName];

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <title>BookingUni</title>
          <link rel="stylesheet" href="${path}css/style.css" />
      </head>
      <body>
          <div id="container">
                <div>
                ${info ? `<div class="notification infoBox"><span>${info}</span></div>` : ''}
                ${error ? `<div class="notification errorBox"><span>${error}</span></div>` : ''}
                ${loading ? `<div class="notification loadingBox">Loading …</div>` : ''}
                </div>
              <nav>
                  ${
                    user
                      ? `<div class="left-container">
                              <ul>
                                  <li><a href="/">Home</a></li>
                                  <li><a href="/add">Add +</a></li>
                              </ul>
                          </div>
                          <div class="right-container">
                              <a href="/profile/${user._id}" class="log-out">${user.username}</a>
                              <a href="/logout" class="log-out">Logout</a>
                          </div>`
                      : `<div class="left-container">
                              <ul>
                                  <li><a href="/">Home</a></li>
                                  <li><a href="/login">Login</a></li>
                                  <li><a href="/register">Register</a></li>
                              </ul>
                          </div>`
                  }
              </nav>
              ${component({ user, data, error, path })}
              <footer>@SoftUni - JS Back-end - BookingUni 2020</footer>
          </div>
      </body>
      </html>`;
};

module.exports = getPage;

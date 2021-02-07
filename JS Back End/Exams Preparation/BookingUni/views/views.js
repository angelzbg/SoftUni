const home = require('./home.js');
const login = require('./login.js');
const register = require('./register.js');
const add = require('./add.js');
const details = require('./details.js');
const edit = require('./edit.js');
const profile = require('./profile.js');

const components = { home, login, register, add, details, edit, profile };

const getPage = ({ componentName, user, data, error, path = './' }) => {
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
                    <div class="notification infoBox" style="display: none;"><span></span></div>
                    ${error ? `<div class="notification errorBox"><span>${error}</span></div>` : ''}
                    <div class="notification loadingBox" style="display: none;">Loading …</div>
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
          <script>
            function showLoading(e) {
                console.log('blegh');
                e.target.style.display = 'none';
                document.querySelector('.notification.loadingBox').style.display = 'block';
                const errorBox = document.querySelector('.notification.errorBox');
                const infoBox = document.querySelector('.notification.infoBox');

                if (errorBox) {
                    errorBox.style.display = 'none';
                }

                if (infoBox) {
                    infoBox.style.display = 'none';
                }
            }

            const info = {
                '#register': 'Successfully registered.',
                '#login': 'Successfully logged in.',
                '#logout': 'Successfully logged out.',
                '#add': 'Successfully added.',
                '#edit': 'Successfully edited.',
                '#delete': 'Successfully deleted.',
                '#book': 'Successfully booked.'
            };

            (() => {
                const hash = window.location.hash;
                if (hash && info[hash]) {
                    document.querySelector('.notification.infoBox > span').textContent = info[hash];
                    document.querySelector('.notification.infoBox').style.display = 'block';
                }
            })();
          </script>
      </body>
      </html>`;
};

module.exports = getPage;

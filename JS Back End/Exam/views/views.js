const home = require('./home.js');
const login = require('./login.js');
const register = require('./register.js');
const add = require('./add.js');
const details = require('./details.js');
const profile = require('./profile.js');
const notFound = require('./notFound.js');

const components = { home, login, register, add, details, profile, notFound };

const getPage = ({ componentName, user, data, error, path = './' }) => {
  const component = components[componentName];

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="${path}css/site.css" />
        <title>Document</title>
      </head>
      <body>
        <header>
          <nav>
            <ul>
              <li><a id="home" class="left-floated" href="/">MoneyGone</a></li>
            </ul>
            <ul>
              ${
                user
                  ? `<li><a class="right-floated" href="/profile">${user.username}</a></li>
                      <li><a class="right-floated" href="/logout">Logout</a></li>`
                  : `<li><a class="right-floated" href="/login">Login</a></li>`
              }
            </ul>
          </nav>
        </header>

        <main>
            ${error ? `<section class="notifications"><p class="notification-message">${error}</p></section>` : ''}
            ${component({ user, data, error, path })}
        </main>

        <footer>
            <img src="https://softuni.bg/Content/images/about-page/softuni.png" alt="">
            <p>Software University - JavaScript Back-End September 2019 Season</p>
            <p>@2019 MoneyGone. All Rights Reserved &copy;</p>
        </footer>
      </body>
    </html>`;
};

module.exports = getPage;

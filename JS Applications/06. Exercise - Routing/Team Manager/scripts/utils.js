export const parseHTMLElement = (htmlString) =>
  new DOMParser().parseFromString(htmlString, 'text/html').documentElement.querySelector('body').firstChild;

export const parseHTMLElements = (...htmlStrings) => htmlStrings.map(parseHTMLElement);

export const emailToUsername = (email) => email.split('@team-manager.com').shift();

export const usernameToEmail = (username) => `${username}@team-manager.com`;

export const notify = (() => {
  const notifications = parseHTMLElement('<div class="notifications"></div>');
  document.querySelector('body').prepend(notifications);

  const remove = (child) => {
    if (notifications.contains(child)) {
      notifications.removeChild(child);
    }
  };

  return (message = '', isError = true, timeout = 5) => {
    const notifiation = parseHTMLElement(
      `<div class="notification ${!isError ? 'active' : ''}">
        <div class="content-notif">${message}</div>
        <div class="close-notif ${!isError ? 'active' : ''}">X</div>
        <div class="progress-notif ${!isError ? 'active' : ''}"></div>
      </div>`
    );

    notifications.appendChild(notifiation);
    setTimeout(() => remove(notifiation), timeout * 1000);

    notifiation.querySelector('div:nth-child(2)').addEventListener('click', () => remove(notifiation));
  };
})();

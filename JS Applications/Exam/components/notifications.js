import { parseHTMLElement } from '../utils/utils.js';
import events from '../utils/events.js';
import { notificationTypes } from '../utils/constants.js';

export default ({ parent }) => {
  const wrapper = document.createElement('div');
  const loadingBox = wrapper.appendChild(parseHTMLElement(`<div class="notification loadingBox">Loading …</div>`));
  const successBox = wrapper.appendChild(parseHTMLElement(`<div class="notification infoBox"></div>`));
  const errorBox = wrapper.appendChild(parseHTMLElement(`<div class="notification errorBox"></div>`));
  parent.before(wrapper);

  let [errorHide, successHide, errorHideTimeout, successHideTimeout] = [false, false];

  events.listen('notification', 'notifications', ({ message = '', type = notificationTypes.ERROR, timeout = 3 }) => {
    if (type === notificationTypes.ERROR) {
      errorBox.textContent = `Error: ${message}`;
      errorBox.style.display = 'block';
      if (errorHide === true) {
        clearTimeout(errorHideTimeout);
      }

      errorHide = true;
      errorHideTimeout = setTimeout(() => {
        errorHide = false;
        errorBox.style.display = 'none';
      }, timeout * 1000);
    } else {
      successBox.textContent = message;
      successBox.style.display = 'block';
      if (successHide === true) {
        clearTimeout(successHideTimeout);
      }

      successHide = true;
      successHideTimeout = setTimeout(() => {
        successHide = false;
        successBox.style.display = 'none';
      }, timeout * 1000);
    }
  });

  events.listen('loading', 'notifications', (status) => (loadingBox.style.display = status ? 'block' : 'none'));

  return {
    wrapper,
    cleanUp: () => {
      events.unlisten('notification', 'notifications');
      events.unlisten('loading', 'notifications');
    },
  };
};

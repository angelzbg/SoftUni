import { parseHTMLElement } from '../utils/utils.js';
import events from '../utils/events.js';
import { notificationTypes } from '../utils/constants.js';

export default ({ parent }) => {
  const errorSection = parent.appendChild(
    parseHTMLElement(
      `<section class="notifications" style="display: none;">
            <p class="notification-message" id="errorBox">Message...</p>
        </section>`
    )
  );

  const successSection = parent.appendChild(
    parseHTMLElement(
      `<section class="notifications"  style="display: none;background-color:rgba(1, 131, 29, 0.541);">
            <p class="notification-message" id="successBox">Message...</p>
        </section> `
    )
  );

  const [errorBox, successBox] = ['errorBox', 'successBox'].map((id) => document.getElementById(id));

  let [errorHide, successHide, errorHideTimeout, successHideTimeout] = [false, false];

  events.listen('notification', 'notifications', ({ message = '', type = notificationTypes.ERROR, timeout = 5 }) => {
    if (type === notificationTypes.ERROR) {
      errorBox.textContent = message;
      errorSection.style.display = 'block';
      if (errorHide === true) {
        clearTimeout(errorHideTimeout);
      }

      errorHide = true;
      errorHideTimeout = setTimeout(() => {
        errorHide = false;
        errorSection.style.display = 'none';
      }, timeout * 1000);
    } else {
      successBox.textContent = message;
      successSection.style.display = 'block';
      if (successHide === true) {
        clearTimeout(successHideTimeout);
      }

      successHide = true;
      successHideTimeout = setTimeout(() => {
        successHide = false;
        successSection.style.display = 'none';
      }, timeout * 1000);
    }
  });

  return {
    wrapper: successSection,
    cleanUp: () => {
      events.unlisten('notification', 'notifications');
      parent.removeChild(errorSection);
    },
  };
};

import { routes } from '../utils/constants.js';
import api from '../utils/api.js';
import events from '../utils/events.js';
import { parseHTMLElement } from '../utils/utils.js';

export default ({ htmlToParent, route, routerID }) => {
  const wrapper = htmlToParent(`<section id="viewCatalog" class="background-img"></section>`);
  let content;
  const render = ({ user }) => {
    if (content) {
      wrapper.removeChild(content);
    }

    if (user) {
      events.trigger('loading', api.isLoading);

      content = parseHTMLElement(
        api.destinations.length
          ? `<div class="added-destinations">
            ${api.destinations
              .map(
                ({ id, name, city, duration, departure, imageUrl, creator }) =>
                  `<a href="#/${routes.DETAILS}/${id}" class="added-destination">
                    <img src="${imageUrl}" alt="" class="picture-added-destination">
                    <h3>${name}</h3>
                    <span>to ${city} </span><span>${departure}</span>
                </a>`
              )
              .join('')}
        </div>`
          : api.isLoading
          ? '<div></div>'
          : `<div class="guest">Currently there are no destinations.</div>`
      );
    } else {
      content = parseHTMLElement(`<div class="guest">No destinations possible! Please sign in...</div>`);
    }

    wrapper.appendChild(content);
  };

  render({ user: api.user });

  events.listen('authChange', `${route[0]}-${routerID}`, render);
  events.listen('dataChange', `${route[0]}-${routerID}`, () => render({ user: api.user }));

  return {
    wrapper,
    cleanUp: () => {
      events.unlisten('authChange', `${route[0]}-${routerID}`);
      events.unlisten('dataChange', `${route[0]}-${routerID}`);
    },
  };
};

import api from '../utils/api.js';
import { routes } from '../utils/constants.js';
import events from '../utils/events.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  let wrapper;
  const render = ({ user }) => {
    if (wrapper) {
      parent.removeChild(wrapper);
    }

    let destinations;

    if (!(destinations = api.destinations.filter((destination) => destination.creator === user.uid)).length) {
      events.trigger('loading', api.isLoading);

      wrapper = htmlToParent(
        `<section id="viewMydestinations">
            ${
              api.isLoading
                ? ''
                : `<h4>You don't have created destinations yet.<br/>Maybe create one and come back later?</h4>`
            }
        </section>`
      );
    } else {
      events.trigger('loading', false);

      wrapper = htmlToParent(
        `<section id="viewMydestinations">
            <h3>Your destinations</h3>
            ${destinations.map(
              ({ id, name, city, duration, departure, imageUrl }) =>
                `<div class="destination-ticket">
                    <div class="destination-left"><img src="${imageUrl}" alt=""/></div>
                    <div class="destination-right">
                        <div><h3>${name}</h3><span>${departure}</span></div>
                        <div>to ${city}</div>
                        <p>${duration} days </p>
                        <a href="#/" class="remove" id="${id}">REMOVE</a>
                        <a href="#/${routes.DETAILS}/${id}" class="details">Details</a>
                    </div>
                </div>`
            ).join('')}
        </section>`
      );

      wrapper.addEventListener('click', (event) => {
        if (event.target.tagName === 'A' && event.target.textContent === 'REMOVE') {
          event.preventDefault();
          api.delete(event.target.id);
        }
      });
    }
  };

  render({ user: api.user });

  events.listen('dataChange', `${route[0]}-${routerID}`, () => render({ user: api.user }));

  return {
    cleanUp: () => {
      events.unlisten('dataChange', `${route[0]}-${routerID}`);
      parent.removeChild(wrapper);
    },
  };
};

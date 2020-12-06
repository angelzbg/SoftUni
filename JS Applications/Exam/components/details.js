import api from '../utils/api.js';
import { routes } from '../utils/constants.js';
import events from '../utils/events.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  let wrapper;
  const render = ({ user }) => {
    if (wrapper) {
      parent.removeChild(wrapper);
    }

    let id, destination;

    if (!(id = route[1]) || !(destination = api.destinations.find((destination) => destination.id === id))) {
      events.trigger('loading', api.isLoading);

      wrapper = htmlToParent(
        `<section id="viewdestinationDetails">
            ${
              api.isLoading
                ? ''
                : `<h2>Destination with id ${id} was not found.<br/><br/>Migh have been deleted or might be in create operation.</h2>`
            }
        </section>`
      );
    } else {
      events.trigger('loading', false);

      wrapper = htmlToParent(
        `<section id="viewdestinationDetails">
            <div class="destination-area">
                <div class="destination-area-left">
                    <img src="${destination.imageUrl}" alt="">
                </div>
                <div class="destination-area-right">
                    <h3>${destination.name}</h3>
                    <div>to ${destination.city}</div>
                    <div class="data-and-time">
                        ${destination.departure}
                        ${
                          destination.creator === user.uid
                            ? `<a href="#/${routes.EDIT}/${id}" class="edit-destination-detail"></a>`
                            : ''
                        }
                    </div>
                    <div>${destination.duration} days</div>
                </div>
            </div>
        </section>`
      );
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

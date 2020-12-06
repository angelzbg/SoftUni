import api from '../utils/api.js';
import events from '../utils/events.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  let wrapper, id, destination;

  const render = () => {
    if (destination && api.destinations.find((destination) => destination.id === id)) {
      return;
    }

    if (wrapper) {
      parent.removeChild(wrapper);
    }

    if (!(id = route[1]) || !(destination = api.destinations.find((destination) => destination.id === id))) {
      events.trigger('loading', api.isLoading);

      wrapper = htmlToParent(
        `<section id="viewEditdestination">
            ${
              api.isLoading
                ? ''
                : `<h2>Destination with id ${id} not found.<br/><br/>Migh have been deleted or might be in create operation.</h2>`
            }
        </section>`
      );
    } else {
      events.trigger('loading', false);

      wrapper = htmlToParent(
        `<section id="viewEditdestination">
            <h2>Edit existing destination</h2>
            <form id="formAdddestination">
                <label for="destination">Destination name:</label>
                <input type="text" id="destination" name="destination" value="${destination.name}">
                <label for="city">City:</label>
                <input type="text" id="city" name="city" value="${destination.city}">
                <label for="duration">Duration:</label>
                <input type="number" id="duration" name="duration" value="${destination.duration}">
                <label for="departureDate">Departure Date:</label>
                <input type="date" id="departureDate" name="departureDate" value="${destination.departure}">
                <label for="imgUrl">Image:</label>
                <input type="text" id="imgUrl" name="imgUrl" value="${destination.imageUrl}">
                <input type="submit" class="create" value="Edit">
            </form>
        </section>`
      );

      wrapper.children[1].addEventListener('submit', (event) => {
        event.preventDefault();
        api.edit(
          ...Array.from(event.target)
            .slice(0, 5)
            .map((el) => el.value.trim()),
          destination
        );
      });
    }
  };

  render();
  events.listen('dataChange', `${route[0]}-${routerID}`, () => render());

  return {
    cleanUp: () => {
      events.unlisten('dataChange', `${route[0]}-${routerID}`);
      parent.removeChild(wrapper);
    },
  };
};

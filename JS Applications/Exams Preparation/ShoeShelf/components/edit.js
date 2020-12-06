import api from '../utils/api.js';
import events from '../utils/events.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  let wrapper, id, shoe;

  const render = ({ user, route }) => {
    if (shoe && api.shoes.find((shoe) => shoe.id === id)) {
      return;
    }

    if (wrapper) {
      parent.removeChild(wrapper);
    }

    if (!(id = route[1]) || !(shoe = api.shoes.find((shoe) => shoe.id === id))) {
      wrapper = htmlToParent(
        `<div class="offer-details">
            ${
              api.isLoading
                ? '<h1>Loading...<h1>'
                : `<h1>Shoe with id ${id} not found.<br/><br/>Migh have been deleted or might be in create operation.</h1>`
            }
        </div>`
      );
    } else {
      wrapper = htmlToParent(
        `<div>
          <h1>Edit Offer</h1>
          <p class="message"></p>
          <form>
              <div>
                  <input type="text" placeholder="Name..." value="${shoe.name}">
              </div>
              <div>
                  <input type="text" placeholder="Price..." value="${shoe.price}">
              </div>
              <div>
                  <input type="text" placeholder="Image url..." value="${shoe.imageUrl}">
              </div>
              <div>
                  <textarea placeholder="Give us some description about this offer...">${shoe.description}</textarea>
              </div>
              <div>
                  <input type="text" placeholder="Brand..." value="${shoe.brand}">
              </div>
              <div>
                  <button>Edit</button>
              </div>
          </form>
        </div>`
      );

      wrapper.children[2].addEventListener('submit', (event) => {
        event.preventDefault();
        api.edit(
          ...Array.from(event.target)
            .slice(0, 5)
            .map((el) => el.value),
          shoe
        );
      });
    }
  };

  render({ user: api.user, route });
  events.listen('dataChange', `${route[0]}-${routerID}`, () => render({ user: api.user, route }));

  return {
    cleanUp: () => {
      events.unlisten('dataChange', `${route[0]}-${routerID}`);
      parent.removeChild(wrapper);
    },
  };
};

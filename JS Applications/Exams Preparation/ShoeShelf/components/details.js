import api from '../utils/api.js';
import { routes } from '../utils/constants.js';
import events from '../utils/events.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  let wrapper;
  const render = ({ user, route }) => {
    if (wrapper) {
      parent.removeChild(wrapper);
    }

    let id, shoe;

    if (!(id = route[1]) || !(shoe = api.shoes.find((shoe) => shoe.id === id))) {
      wrapper = htmlToParent(
        `<div class="offer-details">
            ${
              api.isLoading
                ? '<h1>Loading...</h1>'
                : `<h1>Shoe with id ${id} was not found.<br/><br/>Migh have been deleted or might be in create operation.</h1>`
            }
        </div>`
      );
    } else {
      wrapper = htmlToParent(
        `<div class="offer-details">
            <h1>${shoe.name}</h1>
            <div class="info">
                <img src="${shoe.imageUrl}" alt="">
                <div class="description">
                    ${shoe.description}
                    <br>
                    <br>
                    <p class="price">$${shoe.price}</p>
                </div>
            </div>
            <div class="actions">
                ${
                  shoe.creator.uid === user.uid
                    ? `<a href="/#${routes.EDIT}/${shoe.id}">Edit</a>
                      <a href="/#${routes.HOME}">Delete</a>`
                    : shoe.people[user.uid]
                    ? `<span>You bought it</span>`
                    : `<a href="#/${route.join('/')}">Buy</a>`
                }
            </div>
        </div>`
      );

      if (shoe.creator.uid === user.uid) {
        wrapper.querySelector('div.actions a:nth-child(2)').addEventListener('click', (event) => {
          event.preventDefault();
          api.delete(id);
        });
      } else if (!shoe.people[user.uid]) {
        wrapper.querySelector('div.actions > a').addEventListener('click', (event) => {
          event.preventDefault();
          api.buy(id);
        });
      }
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

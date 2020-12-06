import { routes } from '../utils/constants.js';
import api from '../utils/api.js';
import events from '../utils/events.js';
import { parseHTMLElement, parseHTMLElements } from '../utils/utils.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  let wrapper;

  const render = ({ user, route }) => {
    if (wrapper) {
      parent.removeChild(wrapper);
    }

    if (user) {
      wrapper = htmlToParent(
        api.isLoading
          ? `<div class="container">Loading...</div>`
          : !api.shoes.length
          ? `<a href="#/${routes.ADD}"><h1>No shoes to display. Be the first to create a new offer...</h1></a>`
          : `<div class="shoes">${api.shoes
              .map(({ id, name, price, imageUrl, description, brand, creator, people }) => {
                return `<div class="shoe">
                    <img src="${imageUrl}">
                    <h3>${name}</h3>
                    <a href="#/${routes.DETAILS}/${id}">Buy it for $${price}</a>
                </div>`;
              })
              .join('')}</div>`
      );
    } else {
      wrapper = htmlToParent(
        `<div class="container">
            <div class="about-us">
                <div>
                    <img src="../static/shoes.jpg" alt="">
                    <img src="../static/shoes2.jpg" alt="">
                </div>
                <p>
                    <a href="#/${routes.REGISTER}">Register Now</a> and Try it!
                </p>
            </div>
        </div>`
      );
    }
  };

  render({ user: api.user, route });

  events.listen('authChange', `${route[0]}-${routerID}`, render);
  events.listen('dataChange', `${route[0]}-${routerID}`, () => render({ user: api.user, route }));

  return {
    cleanUp: () => {
      parent.removeChild(wrapper);
      events.unlisten('authChange', `${route[0]}-${routerID}`);
      events.unlisten('dataChange', `${route[0]}-${routerID}`);
    },
  };
};

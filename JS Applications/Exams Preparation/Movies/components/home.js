import { routes } from '../utils/constants.js';
import api from '../utils/api.js';
import events from '../utils/events.js';
import { parseHTMLElement, parseHTMLElements } from '../utils/utils.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  const wrapper = htmlToParent(
    `<div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
        <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg" class="img-fluid" alt="Responsive image">
        <h1 class="display-4">Movies</h1>
        <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
    </div>`
  );

  let searchString = '';
  let partials = [];

  const render = ({ user, route }) => {
    partials.forEach((element) => parent.removeChild(element));
    partials.length = 0;

    if (user) {
      partials = parseHTMLElements(
        `<h1 class="text-center">Movies</h1>`,
        `<section>
            <a href="#/${routes.ADD}" class="btn btn-warning ">Add Movie</a>
            <form class="search float-right">
                <label>Search: </label>
                <input type="text" value="${searchString}">
                <input type="submit" class="btn btn-info" value="Search">
            </form>
        </section>`,
        `<div class=" mt-3 ">
            <div class="row d-flex d-wrap">
                <div class="card-deck d-flex justify-content-center"></div>
            </div>
        </div>`
      );

      wrapper.after(...partials);

      let filteredMovies = api.movies.slice();
      if (searchString) {
        filteredMovies = filteredMovies.filter((item) => item.name.toLowerCase().includes(searchString.toLowerCase()));
      }

      const moviesWrapper = partials[2].children[0].children[0];

      if (!filteredMovies.length) {
        moviesWrapper.appendChild(
          parseHTMLElement(
            api.isLoading
              ? '<h1 class="card-title">Loading...</h1>'
              : searchString
              ? `<h4 class="card-title">No movies containing ${searchString} found.</h4>`
              : '<h4 class="card-title">No movies...</h4>'
          )
        );
      } else {
        moviesWrapper.append(
          ...parseHTMLElements(
            ...filteredMovies.map((item) => {
              return `<div class="card mb-4">
                          <img class="card-img-top" src="${item.image}" alt="Card image cap" width="400">
                          <div class="card-body">
                              <h4 class="card-title">${item.name}</h4>
                          </div>
                          <div class="card-footer">
                              <a href="#/${routes.DETAILS}/${item.id}">
                              <button type="button" class="btn btn-info">Details</button></a>
                          </div>
                      </div>`;
            })
          )
        );
      }

      partials[1].children[1].addEventListener('submit', (event) => {
        event.preventDefault();
        searchString = event.target[0].value;
        render({ user, route });
      });
    } else {
      searchString = '';
    }
  };

  render({ user: api.user, route });

  events.listen('authChange', `${route[0]}-${routerID}`, render);
  events.listen('dataChange', `${route[0]}-${routerID}`, () => render({ user: api.user, route }));

  return {
    wrapper,
    cleanUp: () => {
      events.unlisten('authChange', `${route[0]}-${routerID}`);
      events.unlisten('dataChange', `${route[0]}-${routerID}`);
      partials.forEach((element) => parent.removeChild(element));
    },
  };
};

import api from '../utils/api.js';
import { routes } from '../utils/constants.js';
import events from '../utils/events.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  let wrapper;
  const render = ({ user, route }) => {
    if (wrapper) {
      parent.removeChild(wrapper);
    }

    let id, movie;

    if (!(id = route[1]) || !(movie = api.movies.find((movie) => movie.id === id))) {
      wrapper = htmlToParent(
        `<div class="container">
            ${
              api.isLoading
                ? '<h1>Loading...</h1>'
                : `<h1>Movie with id ${id} was not found.<br/><br/>Migh have been deleted or might be in create operation.</h1>`
            }
        </div>`
      );
    } else {
      wrapper = htmlToParent(
        `<div class="container">
            <div class="row bg-light text-dark">
                <h1>Movie title: ${movie.name}</h1>
                <div class="col-md-8">
                    <img class="img-thumbnail" src="${movie.image}" alt="Movie">
                </div>
                <div class="col-md-4 text-center">
                    <h3 class="my-3 ">Movie Description</h3>
                    <p>${movie.description}</p>
                    ${
                      movie.creator.uid === user.uid
                        ? `<a class="btn btn-danger" href="#/${route.join('/')}">Delete</a>
                            <a class="btn btn-warning" href="#/${routes.EDIT}/${id}">Edit</a>`
                        : `${
                            movie.users[user.uid]
                              ? `<span class="enrolled-span">Liked ${Object.keys(movie.users).length}</span>`
                              : `<a class="btn btn-primary" href="#/${route.join('/')}">Like</a>`
                          }`
                    }
                </div>
            </div>
        </div>`
      );

      if (movie.creator.uid === user.uid) {
        wrapper.querySelector('a.btn.btn-danger').addEventListener('click', () => {
          api.delete(id);
        });
      } else if (!movie.users[user.uid]) {
        wrapper.querySelector('a.btn.btn-primary').addEventListener('click', () => {
          api.like(id);
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

import api from '../utils/api.js';
import events from '../utils/events.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  let wrapper, id, movie;

  const render = ({ user, route }) => {
    if (movie && api.movies.find((movie) => movie.id === id)) {
      return;
    }

    if (wrapper) {
      parent.removeChild(wrapper);
    }

    if (!(id = route[1]) || !(movie = api.movies.find((movie) => movie.id === id))) {
      wrapper = htmlToParent(
        `<div class="container">
            ${
              api.isLoading
                ? '<h1>Loading...<h1>'
                : `<h1>Movie with id ${id} not found.<br/><br/>Migh have been deleted or might be in create operation.</h1>`
            }
        </div>`
      );
    } else {
      wrapper = htmlToParent(
        `<form class="text-center border border-light p-5" action="#" method="">
            <h1>Edit Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Movie Title" value="${movie.name}" name="title">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Movie Description..." name="description">${movie.description}</textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="text" class="form-control" placeholder="Image Url" value="${movie.image}" name="imageUrl">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>`
      );

      wrapper.addEventListener('submit', (event) => {
        event.preventDefault();
        api.edit(
          ...Array.from(event.target)
            .slice(0, 3)
            .map((el) => el.value),
          movie
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

import api from '../utils/api.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  const wrapper = htmlToParent(
    `<form class="text-center border border-light p-5" action="#" method="">
        <h1>Add Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Title" name="title" value="">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Description" name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>`
  );

  wrapper.addEventListener('submit', (event) => {
    event.preventDefault();
    api.create(
      ...Array.from(event.target)
        .slice(0, 3)
        .map((input) => input.value)
    );
  });

  return {
    wrapper,
    cleanUp: () => {},
  };
};

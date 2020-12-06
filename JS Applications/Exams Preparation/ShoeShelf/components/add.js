import api from '../utils/api.js';

export default ({ parent, htmlToParent, route, routerID }) => {
  const wrapper = htmlToParent(
    `<div>
      <h1>Create New Offer</h1>
      <p class="message"></p>
      <form>
          <div><input type="text" placeholder="Name..."></div>
          <div><input type="text" placeholder="Price..."></div>
          <div><input type="text" placeholder="Image url..."></div>
          <div><textarea placeholder="Give us some description about this offer..."></textarea></div>
          <div><input type="text" placeholder="Brand..."></div>
          <div><button>Create</button></div>
      </form>
    </div>`
  );

  wrapper.children[2].addEventListener('submit', (event) => {
    event.preventDefault();
    api.create(
      ...Array.from(event.target)
        .slice(0, 5)
        .map((input) => input.value)
    );
  });

  return {
    wrapper,
    cleanUp: () => {},
  };
};

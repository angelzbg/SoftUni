import api from '../utils/api.js';

export default ({ htmlToParent }) => {
  const wrapper = htmlToParent(
    `<section id="viewAdddestination">
        <h2>Add new destination</h2>
        <form id="formAdddestination">
            <label for="destination">Destination name:</label>
            <input type="text" id="destination" name="destination" placeholder="Destination name">
            <label for="city">City:</label>
            <input type="text" id="city" name="city" placeholder="City">
            <label for="duration">Duration:</label>
            <input type="number" id="duration" name="duration" placeholder="Duration">
            <label for="departureDate">Departure Date:</label>
            <input type="date" id="departureDate" name="departureDate">
            <label for="imgUrl">Image:</label>
            <input type="text" id="imgUrl" name="imgUrl" placeholder="https://">

            <input type="submit" class="create" value="Add">
        </form>
    </section>`
  );

  wrapper.children[1].addEventListener('submit', (event) => {
    event.preventDefault();
    api.create(
      ...Array.from(event.target)
        .slice(0, 5)
        .map((input) => input.value.trim())
    );
  });

  return { wrapper };
};

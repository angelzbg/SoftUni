const add = ({ user, data, error, path }) => {
  let name = (city = imageUrl = rooms = '');
  if (data) {
    ({ name, city, imageUrl, rooms } = data);
  }

  return `
    <section id="viewAddhotel">
    <h2>Add new hotel</h2>
    <form id="formAddhotel" action="/add" method="POST">
        <label for="name">Hotel name:</label>
        <input type="text" id="name" name="name" placeholder="Hotel name" value="${name}">
        <label for="city">City:</label>
        <input type="text" id="city" name="city" placeholder="City" value="${city}">
        <label for="rooms">Free rooms:</label>
        <input type="number" id="rooms" name="rooms" placeholder="Free rooms" value="${rooms}">
        <label for="imageUrl">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" placeholder="https://" value="${imageUrl}">

        <input type="submit" class="create" value="Add">
    </form>
    </section>`;
};

module.exports = add;

const edit = ({ user, data, error, path }) => {
  const { _id, name, city, imageUrl, rooms } = data;

  return `
    <section id="viewAddhotel">
        <h2>Edit existing hotel</h2>
        <form id="formAddhotel" action="/edit/${_id}" method="POST">
            <label for="name">Hotel name:</label>
            <input type="text" id="name" name="name" value="${name}">
            <label for="city">City:</label>
            <input type="text" id="city" name="city" value="${city}">
            <label for="rooms">Free rooms:</label>
            <input type="number" id="rooms" name="rooms" value="${rooms}">
            <label for="imageUrl">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" value="${imageUrl}">

            <input type="submit" class="create" value="Edit" onclick="showLoading(event)">
        </form>
    </section>`;
};

module.exports = edit;

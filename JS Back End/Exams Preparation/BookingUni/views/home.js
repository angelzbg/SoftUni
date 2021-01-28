const home = ({ user, data, error, path }) => {
  return `
    <section id="viewCatalog" class="background-img">
      <div class="added-hotels">
      ${
        data.length
          ? data
              .map(
                (hotel) => `
                  <a href="/details/${hotel._id}" class="added-hotel">
                    <img src="${hotel.imageUrl}" alt="" class="picture-added-hotel" />
                    <h3>${hotel.name}</h3>
                    <span>Free rooms: ${hotel.rooms}</span>
                  </a>`
              )
              .join('')
          : `<div class="guest">There are no Hotels found...</div>`
      }
    </section>`;
};

module.exports = home;

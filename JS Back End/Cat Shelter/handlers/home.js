const {
  database: { getFile },
  generatePage,
} = require('../utils/utils.js');
const url = require('url');
const qs = require('querystring');

module.exports = {
  GET: ({ req, res }) => {
    const db = getFile();
    const query = qs.parse(url.parse(req.url).query);
    const cats =
      query && query.breed
        ? Object.entries(db.cats).filter(([_, { breed }]) => breed.toLowerCase() === query.breed.toLowerCase())
        : Object.entries(db.cats);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
      generatePage(
        `<form action="/" method="GET">
          <input type="text" name="breed">
          <button type="submit">Search</button>
        </form>
        <main>
          <section class="cats">
            <ul>
              ${cats
                .map(
                  ([uuid, { name, description, breed, image }]) =>
                    `<li>
                        <img src="./storage/${image}" alt="Black Cat">
                        <h3>${name}</h3>
                        <p><span>Breed: </span>${breed}</p>
                        <p><span>Description: </span>${description}</p>
                        <ul class="buttons">
                          <li class="btn edit"><a href="/edit/${uuid}">Change Info</a></li>
                          <li class="btn delete"><a href="/shelter/${uuid}">New Home</a></li>
                        </ul>
                      </li>`
                )
                .join('')}
            </ul>
          </section>
        </main>`
      )
    );
    res.end();
  },
};

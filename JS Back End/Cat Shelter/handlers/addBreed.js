const {
  database: { getFile, saveFile },
  generatePage,
} = require('../utils/utils.js');
const qs = require('querystring');

module.exports = {
  GET: ({ res }) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
      generatePage(
        `<form action="/add-breed" method="POST" class="cat-form">
          <h2>Add Cat Breed</h2>
          <label for="breed-name">Breed Name</label>
          <input name="breed" type="text" id="breed-name" />
          <button type="submit">Add Breed</button>
        </form>`
      )
    );
    res.end();
  },
  POST: ({ req, res }) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      const query = qs.parse(body);
      if (query && query.breed) {
        const db = getFile();
        db.breeds.push(query.breed);
        saveFile(db);

        res.writeHead(302, { Location: '/add-breed' });
        res.end();
      } else {
        res.end(null);
      }
    });
  },
};

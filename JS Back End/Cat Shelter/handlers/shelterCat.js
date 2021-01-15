const {
  database: { getFile, saveFile },
  generatePage,
} = require('../utils/utils.js');
const fs = require('fs');

module.exports = {
  GET: ({ res, pathname }) => {
    const uuid = pathname.split('/').pop();
    const db = getFile();
    const cat = db.cats[uuid];
    if (!cat) {
      return (() => {
        res.writeHead(302, { Location: '/' });
        res.end();
      })();
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
      generatePage(
        `<form action="/shelter/${uuid}" method="POST" class="cat-form">
          <h2>Shelter the cat</h2>
          <img src="../storage/${cat.image}" alt="">
          <label for="name">Name</label>
          <input type="text" id="name" value="${cat.name}" disabled>
          <label for="description">Description</label>
          <textarea id="description" disabled>${cat.description}</textarea>
          <label for="group">Breed</label>
          <select id="group" disabled>
            <option value="${cat.breed}">${cat.breed}</option>
          </select>
          <button type="submit">SHELTER THE CAT</button>
        </form>`,
        '../'
      )
    );
    res.end();
  },
  POST: ({ res, pathname, mainPath }) => {
    const uuid = pathname.split('/').pop();
    const db = getFile();
    const cat = db.cats[uuid];
    if (!cat) {
      return (() => {
        res.writeHead(302, { Location: '/' });
        res.end();
      })();
    }

    fs.unlinkSync(mainPath + '/storage/' + cat.image);
    delete db.cats[uuid];
    saveFile(db);
    res.writeHead(302, { Location: '/' });
    res.end();
  },
};

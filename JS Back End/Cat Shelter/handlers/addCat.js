const {
  database: { getFile, saveFile },
  generatePage,
  generateError,
} = require('../utils/utils.js');
const mv = require('mv');
const formidable = require('formidable');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  GET: ({ res }) => {
    const db = getFile();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
      generatePage(
        `<form action="/add-cat" method="POST" class="cat-form" enctype="multipart/form-data">
          <h2>Add Cat</h2>
          <label for="name">Name</label>
          <input name="name" type="text" id="name" required>
          <label for="description">Description</label>
          <textarea name="description" id="description" required></textarea>
          <label for="image">Image</label>
          <input name="upload" type="file" id="image" accept="image/jpg, image/jpeg, image/png, image/gif" required>
          <label for="group">Breed</label>
          <select name="breed" id="group" required>
            ${db.breeds.map((breed) => `<option value="${breed}">${breed}</option>`).join('')}
          </select>
          <button type="submit">Add Cat</button>
        </form>`
      )
    );
    res.end();
  },
  POST: ({ req, res, mainPath }) => {
    const db = getFile();
    const uuid = uuidv4();

    new formidable.IncomingForm().parse(req, (err, fields, files) => {
      if (err) {
        return generateError(res, err.message);
      }

      if (
        !(files && files.upload && files.upload.name && files.upload.name.match('.(jpg|jpeg|png|gif)$')) ||
        !(fields && fields.name && fields.description && fields.breed && db.breeds.includes(fields.breed))
      ) {
        return generateError(res, 'ko ne');
      }

      const oldPath = files.upload.path;
      const newName = `${uuid}.${files.upload.name.toLowerCase().split('.').pop()}`;
      const newPath = path.normalize(path.join(mainPath, '/storage/' + newName));

      mv(oldPath, newPath, () => {});

      db.cats[uuid] = {
        ...({ name, description, breed } = fields),
        image: newName,
      };

      saveFile(db);

      res.writeHead(302, { Location: '/' });
      res.end();
    });
  },
};

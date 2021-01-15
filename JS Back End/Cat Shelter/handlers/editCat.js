const {
  database: { getFile, saveFile },
  generatePage,
  generateError,
} = require('../utils/utils.js');
const fs = require('fs');
const mv = require('mv');
const formidable = require('formidable');
const path = require('path');

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
        `<form action="/edit/${uuid}" method="POST" class="cat-form" enctype="multipart/form-data">
          <h2>Add Cat</h2>
          <label for="name">Name</label>
          <input name="name" type="text" id="name" value="${cat.name}" required>
          <label for="description">Description</label>
          <textarea name="description" id="description" required>${cat.description}</textarea>
          <label for="image">Image</label>
          <input name="upload" type="file" id="image" accept="image/jpg, image/jpeg, image/png, image/gif" required>
          <label for="group">Breed</label>
          <select name="breed" id="group" required>
          ${db.breeds
            .map((breed) => `<option value="${breed}" ${breed === cat.breed ? 'selected' : ''}>${breed}</option>`)
            .join('')}
          </select>
          <button type="submit">Edit Cat</button>
        </form>`,
        '../'
      )
    );
    res.end();
  },
  POST: ({ req, res, pathname, mainPath }) => {
    const uuid = pathname.split('/').pop();
    const db = getFile();
    const cat = db.cats[uuid];
    if (!cat) {
      return (() => {
        res.writeHead(302, { Location: '/' });
        res.end();
      })();
    }

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

      fs.unlinkSync(mainPath + '/storage/' + cat.image);

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

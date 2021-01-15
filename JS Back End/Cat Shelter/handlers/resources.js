const path = require('path');
const fs = require('fs');
const { generateError } = require('../utils/utils.js');

module.exports = {
  css: ({ req, res, mainPath }) => {
    let cssPath = path.join(mainPath, req.url);
    let fileStream;

    if (fs.existsSync(cssPath)) {
      fileStream = fs.createReadStream(cssPath, 'UTF-8');
    } else {
      return generateError(res);
    }

    res.writeHead(200, { 'Content-Type': 'text/css' });
    fileStream.pipe(res);
  },
  images: ({ req, res, mainPath }) => {
    let imagePath = path.join(mainPath, req.url);
    const type = req.url.toLowerCase().split('.').pop();
    let fileStream;

    if (fs.existsSync(imagePath)) {
      fileStream = fs.createReadStream(imagePath);
    } else {
      return generateError(res);
    }

    res.writeHead(200, { 'Content-Type': `image/${type}` });
    fileStream.pipe(res);
  },
};

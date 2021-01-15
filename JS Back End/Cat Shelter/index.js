const http = require('http');
const url = require('url');
const home = require('./handlers/home.js');
const addBreed = require('./handlers/addBreed.js');
const addCat = require('./handlers/addCat.js');
const editCat = require('./handlers/editCat.js');
const shelterCat = require('./handlers/shelterCat.js');
const { css, images } = require('./handlers/resources.js');

const mainPath = __dirname;
const port = 3000;

const router = {
  '^/$': home,
  '^/add-breed$': addBreed,
  '^/add-cat$': addCat,
  '^/edit/.+$': editCat,
  '^/shelter/.+$': shelterCat,
  '.css$': css,
  '.(jpg|jpeg|png|gif|ico)$': images,
};

http
  .createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    const route = Object.entries(router).find(([route, _]) => pathname.match(route));
    if (route) {
      if (typeof route[1] === 'function') {
        route[1]({ req, res, pathname, mainPath });
      } else if (route[1][req.method]) {
        route[1][req.method]({ req, res, pathname, mainPath });
      }
    }
  })
  .listen(port, () => console.log(`Server listening on port ${port}, dir: ${mainPath}`));

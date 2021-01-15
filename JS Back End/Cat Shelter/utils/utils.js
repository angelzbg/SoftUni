const fs = require('fs');
const mainPath = __dirname;

const database = {
  getFile: () => JSON.parse(fs.readFileSync(mainPath + '/../db/cats.json')),
  saveFile: (data = { breeds: [], cats: {} }) => fs.writeFileSync(mainPath + '/../db/cats.json', JSON.stringify(data)),
};

const generatePage = (content = '', path = './') => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
        <link rel="stylesheet" href="${path}static/site.css">
        <link rel="shortcut icon" type="image/png" href="${path}static/favicon.ico"/>
        <title>Cat Shelter</title>
    </head>
    <body>
        <header>
            <nav>
                <ul class="navigation">
                    <li><a href="/">Home Page</a></li>
                    <li><a href="/add-breed">Add Breed</a></li>
                    <li><a href="/add-cat">Add Cat</a></li>
                </ul>
            </nav>
            <h1>Cat Shelter</h1>
        </header>
        ${content}
    </body>
    </html>`;
};

const generateError = (res, msg = 'Resource not found.') => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end(msg);
};

module.exports = { database, generatePage, generateError };

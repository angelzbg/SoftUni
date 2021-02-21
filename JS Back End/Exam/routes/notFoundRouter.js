const router = require('express').Router();
const getPage = require('../views/views.js');

const notFoundRouter = (app) => {
  app.get('*', (req, res) => {
    res.send(getPage({ componentName: 'notFound', user: req.user }));
  });
};

module.exports = notFoundRouter;

const router = require('express').Router();
const getPage = require('../views/views.js');
const checkAuth = require('../middlewares/check-auth.js');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const promisify = require('util').promisify;
const signToken = promisify(jwt.sign);
const userModel = require('../models/user.js');

const { jwtSecret, authCookieName } = config;

router.get('/login', checkAuth(false), (req, res, next) => {
  res.send(getPage({ componentName: 'login' }));
});

router.post('/login', checkAuth(false), (req, res, next) => {
  const { username, password } = req.body;
  userModel
    .findOne({ username })
    .then((user) => Promise.all([user, user ? user.comparePasswords(password) : false]))
    .then(([user, match]) => {
      if (!match) {
        res.send(getPage({ componentName: 'login', error: 'Wrong credentials!', data: req.body }));
        return;
      }

      return signToken({ userId: user._id }, jwtSecret);
    })
    .then((jwtToken) => {
      if (jwtToken) {
        res.cookie(authCookieName, jwtToken, { httpOnly: true });
        res.redirect('/');
      }
    })
    .catch(next);
});

router.get('/logout', checkAuth(true), (req, res) => {
  res.clearCookie(authCookieName);
  res.redirect('/');
});

module.exports = router;

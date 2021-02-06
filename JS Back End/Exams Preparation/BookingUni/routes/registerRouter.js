const router = require('express').Router();
const getPage = require('../views/views.js');
const checkAuth = require('../middlewares/check-auth.js');
const { validateEmail } = require('../utils/utils.js');
const userModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const promisify = require('util').promisify;
const signToken = promisify(jwt.sign);
const { jwtSecret, authCookieName } = config;

router.get('/register', checkAuth(false), (req, res, next) => {
  res.send(getPage({ componentName: 'register' }));
});

router.post('/register', checkAuth(false), async (req, res, next) => {
  const { email, username, password, rePassword } = req.body;

  if (!validateEmail(email)) {
    res.send(getPage({ componentName: 'register', error: 'Please enter a valid Email address!', data: req.body }));
    return;
  }

  if (!username) {
    res.send(getPage({ componentName: 'register', error: 'Please enter Username!', data: req.body }));
    return;
  }

  if (!password) {
    res.send(getPage({ componentName: 'register', error: 'Please enter a password!', data: req.body }));
    return;
  }

  if (!password.match(/^[0-9a-zA-Z]{5,}$/)) {
    res.send(
      getPage({
        componentName: 'register',
        error: 'Password should be at least 5 characters long and should consist only english letters and digits!',
        data: req.body,
      })
    );
    return;
  }

  if (password !== rePassword) {
    res.send(getPage({ componentName: 'register', error: "Passwords don't match!", data: req.body }));
    return;
  }

  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (user) {
    res.send(getPage({ componentName: 'register', error: 'User already exists!', data: req.body }));
    return;
  }

  userModel
    .create({ username, password, email })
    .then(async (doc) => {
      const jwtToken = await signToken({ userId: doc._id }, jwtSecret);
      res.cookie(authCookieName, jwtToken, { httpOnly: true });
      res.redirect('/#register');
    })
    .catch(next);
});

module.exports = router;

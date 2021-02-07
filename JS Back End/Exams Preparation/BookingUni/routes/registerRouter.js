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

  const onValidationFail = (error) => {
    res.send(getPage({ componentName: 'register', error, data: req.body }));
  };

  if (!validateEmail(email)) {
    return onValidationFail('Please enter a valid Email address!');
  }

  if (!username) {
    return onValidationFail('Please enter Username!');
  }

  if (!password) {
    return onValidationFail('Please enter a password!');
  }

  if (!password.match(/^[0-9a-zA-Z]{5,}$/)) {
    return onValidationFail(
      'Password should be at least 5 characters long and should consist only english letters and digits!'
    );
  }

  if (password !== rePassword) {
    return onValidationFail("Passwords don't match!");
  }

  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (user) {
    return onValidationFail('User already exists!');
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

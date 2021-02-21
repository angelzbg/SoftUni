const router = require('express').Router();
const getPage = require('../views/views.js');
const userSchema = require('../models/user.js');
const checkAuth = require('../middlewares/check-auth.js');

router.get('/', async (req, res, next) => {
  res.send(getPage({ componentName: 'home', user: req.user }));
});

router.post('/', checkAuth(true), async (req, res, next) => {
  const {
    user,
    body: { refillAmount },
  } = req;

  try {
    const number = parseFloat(refillAmount);
    if (isNaN(number) || number < 0.01) {
      res.send(getPage({ componentName: 'home', user: req.user, error: 'Refill amount should be positive number!' }));
      return;
    }
  } catch (ex) {
    res.send(getPage({ componentName: 'home', user: req.user, error: 'Refill amount should be positive number!' }));
    return;
  }

  userSchema
    .findByIdAndUpdate(user._id, { amount: user.amount + parseFloat(refillAmount) })
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
});

module.exports = router;

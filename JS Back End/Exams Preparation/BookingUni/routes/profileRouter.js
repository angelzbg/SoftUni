const router = require('express').Router();
const getPage = require('../views/views.js');
const checkAuth = require('../middlewares/check-auth.js');

router.get('/profile/:id', checkAuth(true), (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  if (!user._id.equals(id)) {
    res.redirect('/');
    return;
  }

  res.send(getPage({ componentName: 'profile', user, path: '../' }));
});

module.exports = router;

const router = require('express').Router();
const getPage = require('../views/views.js');
const checkAuth = require('../middlewares/check-auth.js');

router.get('/profile', checkAuth(true), async (req, res, next) => {
  const { user } = req;

  const totalMerches = user.expenses.length;
  const totalAmount = user.expenses.reduce((sum, { total }) => sum + parseFloat(total), 0).toFixed(2);

  res.send(getPage({ componentName: 'profile', user, data: { totalAmount, totalMerches } }));
});

module.exports = router;

const router = require('express').Router();
const getPage = require('../views/views.js');
const checkAuth = require('../middlewares/check-auth.js');
const expenseSchema = require('../models/expense.js');
const userSchema = require('../models/user.js');
const { validateData, categories } = require('../utils/utils.js');

router.get('/add', checkAuth(true), (req, res, next) => {
  res.send(getPage({ componentName: 'add', user: req.user }));
});

router.post('/add', checkAuth(true), async (req, res, next) => {
  let { user, body: data } = req;
  const error = validateData(data);
  if (error) {
    res.send(getPage({ componentName: 'add', user: req.user, error, data }));
    return;
  }

  let { merchant, total, category, description, report } = data;
  report = report ? true : false;

  expenseSchema
    .create({ merchant, total: parseFloat(total), category: categories[category], description, report, user: user._id })
    .then((doc) => {
      userSchema.updateOne({ _id: user._id }, { $push: { expenses: doc._id } }).then(() => {
        res.redirect(`/`);
      });
    })
    .catch(next);
});

router.get('/details/:id', checkAuth(true), async (req, res, next) => {
  const {
    user,
    params: { id: dataId },
  } = req;

  const result = await expenseSchema.findById(dataId);
  if (!result || !result.user.equals(user._id)) {
    res.redirect('/');
    return;
  }

  res.send(getPage({ componentName: 'details', user, path: '../', data: result }));
});

router.get('/delete/:id', checkAuth(true), async (req, res, next) => {
  const {
    user,
    params: { id: dataId },
  } = req;

  const result = await expenseSchema.findById(dataId);
  if (!result || !user._id.equals(result.user)) {
    res.redirect('/');
    return;
  }

  Promise.all([
    expenseSchema.findByIdAndDelete({ _id: dataId }),
    userSchema.findByIdAndUpdate(user._id, { $pull: { expenses: dataId } }),
  ])
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
});

module.exports = router;

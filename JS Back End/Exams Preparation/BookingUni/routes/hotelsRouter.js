const router = require('express').Router();
const getPage = require('../views/views.js');
const checkAuth = require('../middlewares/check-auth.js');
const hotelSchema = require('../models/hotel.js');
const userSchema = require('../models/user.js');
const { validateData } = require('../utils/utils.js');

router.get('/add', checkAuth(true), (req, res, next) => {
  res.send(getPage({ componentName: 'add', user: req.user }));
});

router.post('/add', checkAuth(true), async (req, res, next) => {
  const { user, body: data } = req;
  const error = validateData(data);
  if (error) {
    res.send(getPage({ componentName: 'add', user: req.user, error, data }));
    return;
  }

  const { name, city, rooms, imageUrl } = data;

  const result = await hotelSchema.findOne({ name });
  if (result) {
    res.send(
      getPage({
        componentName: 'add',
        user: user,
        error: `Hotel with ${name} name already exists!`,
        data,
      })
    );
    return;
  }

  hotelSchema
    .create({ name, city, rooms: parseInt(rooms), imageUrl, owner: user._id })
    .then((doc) => {
      userSchema.updateOne({ _id: user._id }, { $push: { offered: doc._id } }).then(() => {
        res.redirect(`/details/${doc._id}#add`);
      });
    })
    .catch(next);
});

router.get('/details/:id', checkAuth(true), async (req, res, next) => {
  const {
    user,
    params: { id: dataId },
  } = req;

  const result = await hotelSchema.findById(dataId);
  if (!result) {
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

  const result = await hotelSchema.findById(dataId);
  if (!result || !user._id.equals(result.owner)) {
    res.redirect('/');
    return;
  }

  const users = result.booked;

  Promise.all([
    hotelSchema.findByIdAndDelete({ _id: dataId }),
    userSchema.findByIdAndUpdate(user._id, { $pull: { offered: dataId } }),
    userSchema.updateMany({ _id: { $in: users } }, { $pull: { booked: dataId } }),
  ])
    .then(() => {
      res.redirect('/#delete');
    })
    .catch(next);
});

router.get('/book/:id', checkAuth(true), async (req, res, next) => {
  const {
    user,
    params: { id: dataId },
  } = req;

  const result = await hotelSchema.findById(dataId);
  if (!result) {
    res.redirect('/');
    return;
  }

  if (result.owner.equals(user._id) || result.booked.findIndex((_id) => _id.equals(user._id)) !== -1) {
    res.redirect('/');
    return;
  }

  Promise.all([
    hotelSchema.findByIdAndUpdate(dataId, { $push: { booked: user._id } }),
    userSchema.findByIdAndUpdate(user._id, { $push: { booked: dataId } }),
  ])
    .then(() => {
      res.redirect(`/details/${dataId}#book`);
    })
    .catch(next);
});

router.get('/edit/:id', checkAuth(true), async (req, res, next) => {
  const {
    user,
    params: { id: dataId },
  } = req;

  const result = await hotelSchema.findById(dataId);
  if (!result) {
    res.redirect('/');
    return;
  }

  if (!result.owner.equals(user._id)) {
    res.redirect('/');
    return;
  }

  res.send(getPage({ componentName: 'edit', user, data: result, path: '../' }));
});

router.post('/edit/:id', checkAuth(true), async (req, res, next) => {
  const {
    user,
    params: { id: dataId },
  } = req;

  const result = await hotelSchema.findById(dataId);
  if (!result) {
    res.redirect('/');
    return;
  }

  if (!result.owner.equals(user._id)) {
    res.redirect('/');
    return;
  }

  const data = { ...req.body, _id: dataId };

  const error = validateData(data);
  if (error) {
    res.send(getPage({ componentName: 'edit', path: '../', user, error, data }));
    return;
  }

  const { name, city, rooms, imageUrl } = data;

  if (result.name !== name) {
    const _data = await hotelSchema.findOne({ name });
    if (!!_data && !_data._id.equals(data._id)) {
      res.send(
        getPage({
          componentName: 'edit',
          path: '../',
          user,
          error: 'Hotel with this name already exists!',
          data,
        })
      );
      return;
    }
  }

  await hotelSchema
    .findByIdAndUpdate(data._id, { name, city, rooms: parseInt(rooms), imageUrl })
    .then(() => {
      res.redirect(`/details/${data._id}#edit`);
    })
    .catch(next);
});

module.exports = router;

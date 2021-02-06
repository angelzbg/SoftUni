const router = require('express').Router();
const getPage = require('../views/views.js');
const checkAuth = require('../middlewares/check-auth.js');
const hotelSchema = require('../models/hotel.js');
const userSchema = require('../models/user.js');
const { validateHotel } = require('../utils/utils.js');

router.get('/add', checkAuth(true), (req, res, next) => {
  res.send(getPage({ componentName: 'add', user: req.user }));
});

router.post('/add', checkAuth(true), async (req, res, next) => {
  const user = req.user;
  const hotelData = req.body;
  let error = validateHotel(hotelData);
  if (error) {
    res.send(getPage({ componentName: 'add', user: req.user, error, data: hotelData }));
    return;
  }
  const { name, city, rooms, imageUrl } = hotelData;

  const hotel = await hotelSchema.findOne({ name });
  if (hotel) {
    res.send(
      getPage({
        componentName: 'add',
        user: req.user,
        error: `Hotel with ${name} name already exists!`,
        data: hotelData,
      })
    );
    return;
  }

  hotelSchema
    .create({ name, city, rooms: parseInt(rooms), imageUrl, owner: user._id })
    .then((doc) => {
      userSchema.updateOne({ _id: req.user._id }, { $push: { offered: doc._id } }).then(() => {
        res.redirect(`/details/${doc._id}#add`);
      });
    })
    .catch(next);
});

router.get('/details/:id', checkAuth(true), async (req, res, next) => {
  const user = req.user;
  const id = req.params.id;
  const hotel = await hotelSchema.findById(id);

  if (!hotel) {
    res.redirect('/');
    return;
  }

  res.send(getPage({ componentName: 'details', user, path: '../', data: hotel }));
});

router.get('/delete/:id', checkAuth(true), async (req, res, next) => {
  const user = req.user;
  const hotelId = req.params.id;
  let hotel = await hotelSchema.findById(hotelId);

  if (!hotel || !user._id.equals(hotel.owner)) {
    res.redirect('/');
    return;
  }

  const users = hotel.booked;

  Promise.all([
    hotelSchema.findByIdAndDelete({ _id: hotelId }),
    userSchema.findByIdAndUpdate(user._id, { $pull: { offered: hotelId } }),
    userSchema.updateMany({ _id: { $in: users } }, { $pull: { booked: hotelId } }),
  ])
    .then(() => {
      res.redirect('/#delete');
    })
    .catch(next);
});

router.get('/book/:id', checkAuth(true), async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  let hotel = await hotelSchema.findById(id);
  if (!hotel) {
    res.redirect('/');
    return;
  }

  if (hotel.owner.equals(user._id) || hotel.booked.findIndex((hId) => hId.equals(user._id)) !== -1) {
    res.redirect('/');
    return;
  }

  Promise.all([
    hotelSchema.findByIdAndUpdate(id, { $push: { booked: user._id } }),
    userSchema.findByIdAndUpdate(user._id, { $push: { booked: id } }),
  ])
    .then(() => {
      res.redirect(`/details/${id}#book`);
    })
    .catch(next);
});

router.get('/edit/:id', checkAuth(true), async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  let hotel = await hotelSchema.findById(id);
  if (!hotel) {
    res.redirect('/');
    return;
  }

  if (!hotel.owner.equals(user._id)) {
    res.redirect('/');
    return;
  }

  res.send(getPage({ componentName: 'edit', user, data: hotel, path: '../' }));
});

router.post('/edit/:id', checkAuth(true), async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  let hotel = await hotelSchema.findById(id);
  if (!hotel) {
    res.redirect('/');
    return;
  }

  if (!hotel.owner.equals(user._id)) {
    res.redirect('/');
    return;
  }

  const hotelData = { ...req.body, _id: id };
  let error = validateHotel(hotelData);
  if (error) {
    res.send(getPage({ componentName: 'edit', path: '../', user: req.user, error, data: hotelData }));
    return;
  }

  const { name, city, rooms, imageUrl } = hotelData;

  await hotelSchema
    .findByIdAndUpdate(id, { name, city, rooms: parseInt(rooms), imageUrl })
    .then(() => {
      res.redirect(`/details/${id}#edit`);
    })
    .catch(next);
});

module.exports = router;

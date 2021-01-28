const router = require('express').Router();
const getPage = require('../views/views.js');
const hotelSchema = require('../models/hotel.js');

router.get('/', async (req, res, next) => {
  const hotels = await hotelSchema.find({});//.populate('users');
  res.send(getPage({ componentName: 'home', user: req.user, data: hotels }));
});

module.exports = router;

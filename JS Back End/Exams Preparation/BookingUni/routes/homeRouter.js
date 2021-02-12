const router = require('express').Router();
const getPage = require('../views/views.js');
const hotelSchema = require('../models/hotel.js');

router.get('/', async (req, res, next) => {
  const result = await hotelSchema.find({});
  res.send(getPage({ componentName: 'home', user: req.user, data: result }));
});

module.exports = router;

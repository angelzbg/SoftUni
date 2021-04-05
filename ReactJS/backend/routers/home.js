const router = require('express').Router();
const User = require('../models/User');

router.get('/api/home', async (req, res) => {
  let city;
  if (!!req.user) {
    city = req.user.city;
  }

  const selected = ['avatar', 'city', 'name', 'created', 'rating', 'ratingRound', 'stars', 'type', 'votes'];

  const result = await Promise.all([
    User.find({ type: 'Developer' }, selected, {
      skip: 0,
      limit: 10,
      sort: { rating: -1, votes: -1 },
    }),
    User.find({ type: 'Organization' }, selected, {
      skip: 0,
      limit: 10,
      sort: { rating: -1, votes: -1 },
    }),
    User.find({ type: 'Developer' }, selected, {
      skip: 0,
      limit: 10,
      sort: { created: -1 },
    }),
    User.find({ type: 'Organization' }, selected, {
      skip: 0,
      limit: 10,
      sort: { created: -1 },
    }),
    ...(city
      ? [
          User.find({ type: 'Developer', city: { $regex: city, $options: 'i' } }, selected, {
            skip: 0,
            limit: 10,
            sort: { rating: -1, votes: -1 },
          }),
          User.find({ type: 'Organization', city: { $regex: city, $options: 'i' } }, selected, {
            skip: 0,
            limit: 10,
            sort: { rating: -1, votes: -1 },
          }),
          User.find({ type: 'Developer', city: { $regex: city, $options: 'i' } }, selected, {
            skip: 0,
            limit: 10,
            sort: { created: -1 },
          }),
          User.find({ type: 'Organization', city: { $regex: city, $options: 'i' } }, selected, {
            skip: 0,
            limit: 10,
            sort: { created: -1 },
          }),
        ]
      : []),
  ]);
  res.status(200).json({
    okay: {
      topDevs: result[0] || [],
      topOrgs: result[1] || [],
      newDevs: result[2] || [],
      newOrgs: result[3] || [],
      topDevsNear: result[4] || [],
      topOrgsNear: result[5] || [],
      newDevsNear: result[6] || [],
      newOrgsNear: result[7] || [],
    },
  });
});

module.exports = router;

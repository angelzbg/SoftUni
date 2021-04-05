const router = require('express').Router();
const User = require('../models/User');

router.get('/api/profile/:id', async (req, res) => {
  const id = req.params.id;
  const profile = await User.findById(id).populate('ratings').lean();
  if (profile) {
    const { _id, city, created, type, name, avatar, rating, ratingRound, votes, stars } = profile;
    const okay = { _id, city, created, type, name, avatar, rating, ratingRound, votes, stars };
    res.status(200).json({ okay });
    return;
  }

  res.status(200).json({ error: 'USER_PROFILE_NOT_FOUND' });
});

module.exports = router;

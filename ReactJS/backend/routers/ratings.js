const router = require('express').Router();
const User = require('../models/User');
const AccountRating = require('../models/Rating');

router.get('/api/ratings/:id', async (req, res) => {
  const accountId = req.params.id;
  const ratings = await AccountRating.find({ accountId })
    .populate('userId', 'avatar city name created rating ratingRound stars type votes')
    .lean();
  res.status(200).json({ okay: ratings ?? [] });
});

// SHOULD BE DONE WITH INCREMENT AND ROUNDED ON THE FRONTEND
router.post('/api/rateUser/:id', async (req, res, next) => {
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  let stars = parseInt(req.body.stars ?? 5);

  if (isNaN(stars)) {
    res.status(200).json({ error: 'UNEXPECTED_ERROR' });
    return;
  }

  if (stars < 1) {
    stars = 1;
  } else if (stars > 5) {
    stars = 5;
  }

  const ratingUserId = req.user._id.toString();
  const ratedUserId = req.params.id;
  const ratedUser = await User.findById(ratedUserId);
  if (!ratedUser) {
    res.status(200).json({ error: 'USER_PROFILE_NOT_FOUND' });
    return;
  }

  const foundRating = await AccountRating.findOne({ userId: ratingUserId, accountId: ratedUserId });
  const created = new Date().getTime();
  if (foundRating) {
    const newStars = ratedUser.stars - (foundRating.stars - stars);
    const newRating = newStars / ratedUser.votes;
    const newRatingRound = Math.round(newRating);

    Promise.all([
      User.findByIdAndUpdate(ratedUserId, { stars: newStars, rating: newRating, ratingRound: newRatingRound }),
      AccountRating.findByIdAndUpdate(foundRating._id, { stars, ...(foundRating.stars !== stars ? { created } : {}) }),
    ])
      .then(() => res.status(200).json({ okay: 'USER_PROFILE_RATED' }))
      .catch(next);
  } else {
    const accountRating = new AccountRating({ userId: ratingUserId, accountId: ratedUserId, stars, created });
    accountRating.save(async (err) => {
      if (err) {
        res.status(200).json({ error: 'UNEXPECTED_ERROR' });
      } else {
        const newVotes = ratedUser.votes + 1;
        const newStars = ratedUser.stars + stars;
        const newRating = newStars / newVotes;
        const newRatingRound = Math.round(newRating);
        await User.findByIdAndUpdate(ratedUserId, {
          votes: newVotes,
          stars: newStars,
          rating: newRating,
          ratingRound: newRatingRound,
        });
        res.status(200).json({ okay: 'USER_PROFILE_RATED' });
      }
    });
  }
});

module.exports = router;

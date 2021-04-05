const router = require('express').Router();
const ProfileComment = require('../models/ProfileComment');

router.post('/api/activity/comments', async (req, res) => {
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  let createdComment;
  if (req.body.createdComment) {
    createdComment = parseInt(req.body.createdComment);
    if (isNaN(createdComment)) {
      res.status(200).json({ error: 'INVALID_DATE_PROVIDED_FOR_COMMENTS' });
      return;
    }
  }

  const comments = await ProfileComment.find({
    $or: [{ userId: req.user._id }, { accountId: req.user._id }],
    created: { $lt: createdComment || Number.MAX_SAFE_INTEGER },
  })
    .sort({ created: -1 })
    .limit(20)
    .populate('userId', 'avatar city name created rating ratingRound stars type votes')
    .populate('accountId', 'avatar city name created rating ratingRound stars type votes')
    .lean();

  res.status(200).json({ okay: comments || [] });
});

module.exports = router;

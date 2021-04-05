const router = require('express').Router();
const User = require('../models/User');
const ProfileComment = require('../models/ProfileComment');

router.get('/api/comments/:id', async (req, res) => {
  const accountId = req.params.id;
  const comments = await ProfileComment.find({ accountId })
    .populate('userId', 'avatar city name created rating ratingRound stars type votes')
    .lean();
  res.status(200).json({ okay: comments || [] });
});

router.post('/api/comments/:id', async (req, res) => {
  const accountId = req.params.id;
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  const { content } = req.body;
  if (typeof content !== 'string' || !content || content.length < 10 || content.length > 255) {
    res.status(200).json({ error: 'COMMENT_CONTENT_ERROR' });
    return;
  }

  const userId = req.user._id.toString();
  const profile = await User.findById(accountId);
  if (!profile) {
    res.status(200).json({ error: 'USER_PROFILE_NOT_FOUND' });
    return;
  }

  const created = new Date().getTime();

  const profileComment = new ProfileComment({ userId, accountId, content, created });
  profileComment.save(async (err) => {
    if (err) {
      res.status(200).json({ error: 'UNEXPECTED_ERROR' });
    } else {
      res.status(200).json({ okay: 'USER_PROFILE_COMMENTED' });
    }
  });
});

router.post('/api/comments/action/:id', async (req, res) => {
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  const id = req.params.id;
  const action = req.body.action;

  if (action === 'delete') {
    const found = await ProfileComment.findById(id);
    if (!found) {
      res.status(200).json({ error: 'COMMENT_NOT_FOUND' });
      return;
    }

    if (found.userId.toString() !== req.user._id.toString()) {
      res.status(200).json({ error: 'COMMENT_AUTHOR_NOT_MATCHING' });
      return;
    }

    ProfileComment.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(200).json({ error: 'UNEXPECTED_ERROR' });
      } else {
        res.status(200).json({ okay: 'COMMENT_DELETED' });
      }
    });
    return;
  }

  if (!['like', 'dislike'].includes(action)) {
    res.status(200).json({ error: 'COMMENT_ACTION_NOT_PROVIDED' });
    return;
  }

  ProfileComment.findByIdAndUpdate(
    id,
    {
      $pull: { [action === 'like' ? 'dislikes' : 'likes']: req.user._id },
      $push: { [action === 'like' ? 'likes' : 'dislikes']: req.user._id },
    },
    (err) => {
      if (err) {
        res.status(200).json({ error: 'COMMENT_NOT_FOUND' });
      } else {
        res.status(200).json({ okay: 'COMMENT_ACTION_SUCCESS' });
      }
    }
  );
});

module.exports = router;

const router = require('express').Router();
const Friend = require('../models/Friend');
const Message = require('../models/Message');
const Events = require('../utils/events');

router.post('/api/message', async (req, res) => {
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  const chatId = req.body.chatId;
  const content = req.body.content;
  if (typeof content !== 'string' || content.length < 1 || content.length > 1000) {
    res.status(200).json({ error: 'INVALID_CONTENT_FOR_MESSAGE' });
    return;
  }

  const foundFriend = await Friend.findOne({ chatId }).populate('users', '_id socketId');
  if (!foundFriend) {
    res.status(200).json({ error: 'FRIENDSHIP_NOT_FOUND' });
    return;
  }

  const socketId = foundFriend.users.find(({ _id }) => _id.toString() !== req.user._id.toString()).socketId;

  const created = new Date().getTime();
  const message = new Message({ chatId, sender: req.user._id, created, content });
  message.save(async (err, doc) => {
    if (err) {
      res.status(200).json({ error: 'UNEXPECTED_ERROR' });
    } else {
      const data = {
        _id: doc._id,
        chatId,
        sender: req.user._id.toString(),
        created,
        content,
      };
      res.status(200).json({ okay: data });
      Events.trigger('emit', { id: socketId, channel: 'new-message', data });
    }
  });
});

router.post('/api/message/:id', async (req, res) => {
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  const chatId = req.params.id;
  let created;
  if (req.body.created) {
    created = parseInt(req.body.created);
    if (isNaN(created)) {
      res.status(200).json({ error: 'INVALID_DATE_FOR_LOAD_MESAGES' });
      return;
    }
  }

  const messages = await Message.find({ chatId, created: { $lt: created } })
    .sort({ created: -1 })
    .limit(10);

  res.status(200).json({ okay: (messages || []).sort((a, b) => a.created - b.created) });
});

router.post('/api/chats', async (req, res) => {
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  let created;
  if (req.body.created) {
    created = parseInt(req.body.created);
    if (isNaN(created)) {
      res.status(200).json({ error: 'UNEXPECTED_ERROR' });
      return;
    }
  }

  const friends = ((await Friend.find({ users: req.user._id })) || []).map(({ chatId }) => chatId);
  if (!friends.length) {
    res.status(200).json({ okay: [] });
    return;
  }

  if (created === undefined) {
    /*const messages = await Message.aggregate([
        { $match: { chatId: { $in: friends } } },
        { $sort: { created: -1 } },
        { $group: { chatId: '$chatId', latest: { $first: '$$ROOT' } } },
      ]);*/
    const messages = (
      await Promise.all(friends.map((chatId) => Message.findOne({ chatId }).sort({ created: -1 }).limit(1)))
    ).filter((m) => !!m);
    res.status(200).json({ okay: messages || [] });
  } else {
    const messages = await Message.find({ chatId: { $in: friends }, created: { $gt: created } });
    res.status(200).json({ okay: (messages || []).sort((a, b) => a.created - b.created) });
  }
});

module.exports = router;

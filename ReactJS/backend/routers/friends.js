const router = require('express').Router();
const User = require('../models/User');
const Friend = require('../models/Friend');
const FriendRequest = require('../models/FriendRequest');
const Message = require('../models/Message');
const Events = require('../utils/events');
const uniqid = require('uniqid');

router.get('/api/send-friend-request/:id', async (req, res) => {
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  const id = req.params.id;
  const foundUser = await User.findById(id);
  if (!foundUser) {
    res.status(200).json({ error: 'USER_PROFILE_NOT_FOUND' });
    return;
  }

  const foundFriendship = await Friend.findOne({ users: { $all: [req.user._id, foundUser._id] } });
  if (foundFriendship) {
    res.status(200).json({ error: 'USER_ALREADY_FRIENDED' });
    return;
  }

  const foundRequest = await FriendRequest.findOne({
    $or: [
      { sender: req.user._id, receiver: id },
      { sender: id, receiver: req.user._id },
    ],
  });
  if (foundRequest) {
    res.status(200).json({ error: 'REQUEST_ALREADY_EXISTS' });
    return;
  } else {
    const friendRequest = new FriendRequest({
      sender: req.user._id,
      receiver: foundUser._id,
      created: new Date().getTime(),
    });
    friendRequest.save(async (err, doc) => {
      if (err) {
        res.status(200).json({ error: 'UNEXPECTED_ERROR' });
      } else {
        const data = {
          ...(() => {
            const { _id, created } = doc;
            return { _id, created };
          })(),
          sender: (() => {
            const { _id, city, created, type, name, avatar, rating, ratingRound, votes, stars } = req.user;
            return { _id, city, created, type, name, avatar, rating, ratingRound, votes, stars };
          })(),
          receiver: (() => {
            const { _id, city, created, type, name, avatar, rating, ratingRound, votes, stars } = foundUser;
            return { _id, city, created, type, name, avatar, rating, ratingRound, votes, stars };
          })(),
        };
        res.status(200).json({ okay: data });
        Events.trigger('emit', {
          id: foundUser.socketId,
          channel: 'friend-request-received',
          data,
        });
      }
    });
  }
});

router.get('/api/accept-friend-request/:id', async (req, res) => {
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  const requestId = req.params.id;
  const foundRequest = await FriendRequest.findById(requestId);
  if (!foundRequest) {
    res.status(200).json({ error: 'FRIEND_REQUEST_NOT_FOUND' });
    return;
  }

  if (foundRequest.receiver.toString() !== req.user._id.toString()) {
    res.status(200).json({ error: 'UNAUTHORIZED_ACCESS' });
    return;
  }

  const users = [req.user._id, foundRequest.sender];
  const chatId = uniqid() + uniqid();
  const friendship = new Friend({ users, created: new Date().getTime(), chatId });
  friendship.save(async (err, doc) => {
    if (err) {
      res.status(200).json({ error: 'UNEXPECTED_ERROR' });
    } else {
      const senderId = foundRequest.sender;
      await FriendRequest.findByIdAndDelete(requestId);
      const sender = await User.findById(senderId)
        .populate('sender', '_id city created type name avatar rating ratingRound votes stars socketId')
        .lean();

      const data = {
        ...(() => {
          const { _id, created } = doc;
          return { _id, created, chatId };
        })(),
        users: [
          (() => {
            const { _id, city, created, type, name, avatar, rating, ratingRound, votes, stars } = req.user;
            return { _id, city, created, type, name, avatar, rating, ratingRound, votes, stars };
          })(),
          (() => {
            const { _id, city, created, type, name, avatar, rating, ratingRound, votes, stars } = sender;
            return { _id, city, created, type, name, avatar, rating, ratingRound, votes, stars };
          })(),
        ],
      };

      res.status(200).json({ okay: data });
      Events.trigger('emit', {
        id: sender.socketId,
        channel: 'friend-request-accepted',
        data: { friend: data, removed: requestId },
      });
    }
  });
});

router.get('/api/remove-friend-request/:id', async (req, res) => {
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  const requestId = req.params.id;
  const foundRequest = await FriendRequest.findById(requestId)
    .populate('sender', '_id socketId')
    .populate('receiver', '_id socketId')
    .lean();

  if (!foundRequest) {
    res.status(200).json({ error: 'REQUEST_NOT_FOUND' });
    return;
  } else {
    let sender = req.user._id.toString() === foundRequest.sender._id.toString();
    let receiver = req.user._id.toString() === foundRequest.receiver._id.toString();
    if (sender || receiver) {
      const id = foundRequest._id.toString();
      await FriendRequest.findByIdAndDelete(id);
      res.status(200).json({ okay: 'REQUEST_REMOVED' });
      Events.trigger('emit', {
        id: sender ? foundRequest.receiver.socketId : foundRequest.sender.socketId,
        channel: 'friend-request-removed',
        data: id,
      });
    } else {
      res.status(200).json({ error: 'UNAUTHORIZED_ACCESS' });
    }
  }
});

router.get('/api/friends/remove/:id', async (req, res) => {
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  const friendId = req.params.id;
  const foundFriend = await Friend.findById(friendId).populate('users', '_id socketId').lean();
  if (!foundFriend) {
    res.status(200).json({ error: 'FRIENDSHIP_NOT_FOUND' });
    return;
  }

  const isValid = foundFriend.users.find(({ _id }) => _id.toString() === req.user._id.toString());
  if (!isValid) {
    res.status(200).json({ error: 'UNAUTHORIZED_ACCESS' });
    return;
  }

  const chatId = foundFriend.chatId;
  await Promise.all([Message.deleteMany({ chatId }), Friend.findByIdAndDelete(friendId)]);
  res.status(200).json({ okay: 'FRIENDSHIP_REMOVED' });
  Events.trigger('emit', {
    id: foundFriend.users.find(({ _id }) => _id.toString() !== req.user._id.toString()).socketId,
    channel: 'friend-removed',
    data: friendId,
  });
});

router.get('/api/friends', async (req, res) => {
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  const friends = await Friend.find({ users: req.user._id })
    .populate('users', '_id city created type name avatar rating ratingRound votes stars chatId')
    .sort({ created: -1 })
    .lean();

  res.status(200).json({ okay: friends || [] });
});

router.get('/api/friend-requests', async (req, res) => {
  if (!req.user) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  const friendRequests = await FriendRequest.find({
    $or: [{ sender: req.user._id }, { receiver: req.user._id }],
  })
    .populate('sender', '_id city created type name avatar rating ratingRound votes stars')
    .populate('receiver', '_id city created type name avatar rating ratingRound votes stars')
    .sort({ created: -1 })
    .lean();

  res.status(200).json({ okay: friendRequests || [] });
});

module.exports = router;

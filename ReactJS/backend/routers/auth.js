const router = require('express').Router();
const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');
const User = require('../models/User');
const { secret } = require('../utils/constants');
const { getId } = require('../utils/utils');

router.post('/api/register', async (req, res) => {
  let { login, password, type, name, avatar, city } = req.body;

  if (
    typeof login !== 'string' ||
    login.length < 3 ||
    login.length > 14 ||
    typeof password !== 'string' ||
    !['Developer', 'Organization'].includes(type) ||
    (avatar && typeof avatar !== 'string') ||
    typeof city !== 'string'
  ) {
    res.status(200).json({ error: 'UNEXPECTED_ERROR' });
    return;
  }

  const found = await User.findOne({ login });
  if (found) {
    res.status(200).json({ error: 'LOGON_TAKEN' });
    return;
  }

  if (avatar) {
    const id = getId();
    try {
      require('fs').writeFileSync(
        `public/avatars/${id}.jpg`,
        avatar.replace(/^data:image\/jpeg;base64,/, ''),
        'base64'
      );
      avatar = `${id}.jpg`;
    } catch (ex) {
      avatar = '';
    }
  }

  const user = new User({
    login,
    password,
    type,
    name,
    city,
    created: new Date().getTime(),
    socketId: uniqid() + getId() + uniqid(),
    ...(avatar ? { avatar } : {}),
  });

  user.save((err) => {
    if (err) {
      res.status(200).json({ error: 'UNEXPECTED_ERROR' });
    } else {
      const token = jwt.sign({ login }, secret /*, { expiresIn: '1h' }*/);
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({ okay: 'REGISTER_SUCCESSFUL' });
    }
  });
});

router.post('/api/login', (req, res) => {
  const { login, password } = req.body;

  if (typeof login !== 'string' || typeof password !== 'string') {
    res.status(200).json({ error: 'UNEXPECTED_ERROR' });
    return;
  }

  User.findOne({ login }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(200).json({ error: 'UNEXPECTED_ERROR' });
    } else if (!user) {
      res.status(200).json({ error: 'WRONG_CREDENTIALS' });
    } else {
      user.isCorrectPassword(password, (err, same) => {
        if (err) {
          res.status(200).json({ error: 'UNEXPECTED_ERROR' });
        } else if (!same) {
          res.status(200).json({ error: 'WRONG_CREDENTIALS' });
        } else {
          const token = jwt.sign({ login }, secret /*, { expiresIn: '1h' }*/);
          res.cookie('token', token, { httpOnly: true });
          res.status(200).json({ okay: 'LOGIN_SUCCESSFUL' });
        }
      });
    }
  });
});

router.get('/api/logout', (_, res) => {
  res.clearCookie('token');
  res.status(200).json({ okay: 'LOGOUT_SUCCESSFUL' });
});

router.get('/api/userInfo', (req, res) => {
  if (req.user) {
    const { _id, city, created, type, name, avatar, rating, ratingRound, votes, stars } = req.user;
    const { lastNotifCheck, socketId } = req.user;
    res.status(200).json({
      okay: { _id, city, created, type, name, avatar, rating, ratingRound, votes, stars, lastNotifCheck, socketId },
    });
  } else {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
  }
});

router.post('/api/userInfo/:id', async (req, res) => {
  const id = req.params.id;

  if (!req.user || req.user._id.toString() !== id) {
    res.status(200).json({ error: 'TOKEN_NOT_FOUND' });
    return;
  }

  let { name, city, avatar, lastNotifCheck } = req.body;

  if (name) {
    if (typeof name !== 'string') {
      res.status(200).json({ error: 'UNEXPECTED_ERROR' });
      return;
    }

    await User.findByIdAndUpdate(id, { name });
    res.status(200).json({ okay: name });
    return;
  } else if (city) {
    if (typeof city !== 'string') {
      res.status(200).json({ error: 'UNEXPECTED_ERROR' });
      return;
    }

    await User.findByIdAndUpdate(id, { city });
    res.status(200).json({ okay: city });
    return;
  } else if (avatar) {
    if (typeof avatar !== 'string') {
      res.status(200).json({ error: 'UNEXPECTED_ERROR' });
      return;
    }

    const imgId = getId();
    try {
      require('fs').writeFileSync(
        `public/avatars/${imgId}.jpg`,
        avatar.replace(/^data:image\/jpeg;base64,/, ''),
        'base64'
      );
      avatar = `${imgId}.jpg`;

      if (req.user.avatar) {
        require('fs').unlinkSync(`public/avatars/${req.user.avatar}`);
      }
    } catch (ex) {
      avatar = '';
    }

    await User.findByIdAndUpdate(id, { avatar });
    res.status(200).json({ okay: avatar });
    return;
  } else if (lastNotifCheck) {
    const date = new Date().getTime();
    await User.findByIdAndUpdate(id, { lastNotifCheck: date });
    res.status(200).json({ okay: date });
    return;
  }

  res.status(200).json({ error: 'UNEXPECTED_ERROR' });
});

module.exports = router;

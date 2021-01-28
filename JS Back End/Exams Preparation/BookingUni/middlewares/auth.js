const config = require('../config/config.js');
const jwt = require('jsonwebtoken');
const { authCookieName, authHeaderName, jwtSecret } = config;
const userModel = require('../models/user.js');

module.exports = (req, res, next) => {
  const token = req.cookies[authCookieName] || req.headers[authHeaderName];
  if (!token) {
    next();
    return;
  }

  jwt.verify(token, jwtSecret, async (err, decoded) => {
    if (err) {
      next(err);
      return;
    }

    let user;
    if (req.path.match('^/profile/.+$')) {
      user = await userModel.findById(decoded.userId).populate('booked');
    } else {
      user = await userModel.findById(decoded.userId);
    }

    req.user = JSON.parse(JSON.stringify(user));
    res.locals.isLogged = !!req.user;
    next();
  });
};

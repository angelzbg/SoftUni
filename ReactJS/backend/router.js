const activities = require('./routers/activities');
const auth = require('./routers/auth');
const chats = require('./routers/chats');
const comments = require('./routers/comments');
const developers = require('./routers/developers');
const friends = require('./routers/friends');
const home = require('./routers/home');
const organizations = require('./routers/organizations');
const profiles = require('./routers/profiles');
const ratings = require('./routers/ratings');
const search = require('./routers/search');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('./utils/constants');

module.exports = (app) => {
  app.use((req, _, next) => {
    const token = req.cookies.token || req.headers.token; /*[authHeaderName]*/
    if (!token) {
      next();
      return;
    }

    jwt.verify(token, secret, async (err, decoded) => {
      if (err) {
        next(/*err*/);
        return;
      }

      req.user = await User.findOne({ login: decoded.login });
      req.token = token;
      next();
    });
  });

  [
    activities,
    auth,
    chats,
    comments,
    developers,
    friends,
    home,
    organizations,
    profiles,
    ratings,
    search,
  ].forEach((r) => app.use(r));

  app.use((err, _, res, _1) => {
    if (err) {
      console.log(err);
      res.status(200).json({ error: 'UNEXPECTED_ERROR' });
    }
  });
};

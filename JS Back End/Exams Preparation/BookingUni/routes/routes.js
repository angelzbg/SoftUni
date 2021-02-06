const homeRouter = require('./homeRouter.js');
const loginRouter = require('./loginRouter.js');
const registerRouter = require('./registerRouter.js');
const hotelsRouter = require('./hotelsRouter.js');
const profileRouter = require('./profileRouter.js');

const auth = require('../middlewares/auth.js');

const routes = [homeRouter, loginRouter, registerRouter, hotelsRouter, profileRouter];

const useRouter = (app) => {
  app.use(auth);

  routes.forEach((r) => app.use(r));

  app.get('*', (_, res) => {
    res.redirect('/');
  });

  app.use((err, _, res, _1) => {
    // Vsichki greshki pri normalna rabota sa hvanati i redirectvat kum homepage
    // Vsichki greshki otnosno validaciqta pri normalna rabota se pokazvat vuv FE
    // Kofti zaqwvki ot nedobrojelateli si hodqt na home page
    if (err) {
      console.log(err);
      res.redirect('/');
    }
  });
};

module.exports = useRouter;

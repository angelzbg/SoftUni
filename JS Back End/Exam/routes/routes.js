const homeRouter = require('./homeRouter.js');
const loginRouter = require('./loginRouter.js');
const registerRouter = require('./registerRouter.js');
const expensesRouter = require('./expensesRouter.js');
const profileRouter = require('./profileRouter.js');
const notFoundRouter = require('./notFoundRouter.js');

const auth = require('../middlewares/auth.js');

const routes = [homeRouter, loginRouter, registerRouter, expensesRouter, profileRouter];

const useRouter = (app) => {
  app.use(auth);

  routes.forEach((r) => app.use(r));

  notFoundRouter(app);

  app.use((err, _, res, _1) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    }
  });
};

module.exports = useRouter;

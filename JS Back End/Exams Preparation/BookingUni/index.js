const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config.js');
const auth = require('./middlewares/auth.js');
const router = require('./routes/routes.js');

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(auth);

router.forEach((r) => app.use(r));

app.get('*', (req, res) => {
  res.redirect('/');
});

app.use((err, req, res, next) => {
  if (err.message === 'BAD_REQUEST') {
    res.status(400);
    return;
  }

  if (err.message === 'UNAUTHORIZED') {
    res.redirect('/');
    return;
  }
});

mongoose
  .connect(config.dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to database successfully!');
    app.listen(config.port, console.log(`Listening on port ${config.port}! http://localhost:${config.port}`));
  });

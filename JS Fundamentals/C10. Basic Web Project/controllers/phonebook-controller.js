const phonebook = require('../phonebook');

module.exports = {
  index: (req, res) => {
    res.render('index');
    // TODO: load index page
  },
  addPhonebookPost:(req, res) => {
    // TODO: add a phonebook object to the array
  }
}
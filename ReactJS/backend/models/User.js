const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true, unique: true, minlength: 3, maxlength: 14 },
  password: { type: String, required: true },
  city: { type: String, required: true },
  created: { type: Number, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String },
  stars: { type: Number, default: 0 },
  votes: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  ratingRound: { type: Number, default: 0 },
  lastNotifCheck: { type: Number, default: 0 },
  socketId: { type: String, required: true },
});

UserSchema.pre('save', function (next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);

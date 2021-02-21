const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/config.js');
const saltRounds = config.saltRounds;
const Types = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: /^[0-9a-zA-Z]{4,}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  expenses: [{ type: Types.ObjectId, ref: 'expense' }],
});

userSchema.methods.comparePasswords = function (providedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(providedPassword, this.password, function (err, result) {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
};

userSchema.pre('save', function (done) {
  const user = this;

  if (!user.isModified('password')) {
    done();
    return;
  }

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      done(err);
      return;
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        done(err);
        return;
      }

      user.password = hash;
      done();
    });
  });
});

module.exports = new mongoose.model('user', userSchema);

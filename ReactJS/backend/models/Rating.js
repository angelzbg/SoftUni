const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const AccountRatingSchema = new mongoose.Schema({
  userId: { type: Types.ObjectId, required: true, ref: 'User' },
  stars: { type: Number, required: true, min: 0, max: 5 },
  accountId: { type: Types.ObjectId, required: true, ref: 'User' },
  created: { type: Number, required: true },
});

module.exports = mongoose.model('AccountRating', AccountRatingSchema);

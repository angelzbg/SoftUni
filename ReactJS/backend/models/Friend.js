const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const FriendSchema = new mongoose.Schema({
  users: [{ type: Types.ObjectId, ref: 'User' }],
  created: { type: Number, required: true },
  chatId: { type: String },
});

module.exports = mongoose.model('Friend', FriendSchema);
